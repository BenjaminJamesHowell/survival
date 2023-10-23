import { WebSocketServer } from "ws";
import FastNoiseLite from "fastnoise-lite";
import { readFileSync, existsSync, writeFileSync } from "fs";

const server = new WebSocketServer({
	port: 4700,
});

const defaultClient = {
	velocity: {
		x: 0,
		y: 0,
	},
	position: {
		x: 100,
		y: 100,
	},
	keys: {
		KeyW: false,
		KeyA: false,
		KeyS: false,
		KeyD: false,
	},
};

const playerAcceleration = 0.01;
let clients = new Array(10).fill(undefined);
let sockets = new Array(10).fill(undefined);
let wPressed = [false, false, false, false];
let lastTickStart = Date.now();
let delta = 0;
const { world, height: worldHeight, width: worldWidth } = getWorld();
const doCollision = true;

const sendUpdateRate = 60;
const tickRate = 60;

const sendUpdateIntervalMs = 1000 / sendUpdateRate;
const tickIntervalMs = 1000 / tickRate;

const fov = {
	width: 41,
	height: 24,
};

server.on("connection", socket => {
	const clientId = getFreeClientId();
	if (clientId === -1) {
		const data = {
			status: "error",
			message: "The server is full!",
			type: "serverFull",
		};
		socket.send(JSON.stringify(data));
		return;
	}

	sockets[clientId] = socket;
	clients[clientId] = structuredClone(defaultClient);

	socket.on("message", msg => {
		receiveUpdate(clientId, msg)
	});

	socket.on("close", () => {
		sockets[clientId] = undefined;
		clients[clientId] = undefined;
	});
});

setInterval(tick, tickIntervalMs);
setInterval(sendUpdates, sendUpdateIntervalMs);

function sendUpdates() {
	const playerLocations = clients.map(client => {
		if (client === undefined) {
			return undefined;
		}

		return { position: client.position };
	});
	for (const clientId in sockets) {
		if (sockets[clientId] === undefined) {
			continue;
		}

		const socket = sockets[clientId];
		const sorroundingsBounds = {
			x: {
				min: Math.ceil(clients[clientId].position.x / 1) * 1 - fov.width,
				max: Math.ceil(clients[clientId].position.x / 1) * 1 + fov.width,
			},
			y: {
				min: Math.ceil(clients[clientId].position.y / 1) * 1 - fov.height,
				max: Math.ceil(clients[clientId].position.y / 1) * 1 + fov.height,
			},
		};
		const defaultY = { type: 2, humidity: 0, temperature: 0 }; // TODO:
		const defaultX = new Array(worldHeight).fill({ type: 2, humidity: 0, temperature: 0 }); // TODO:
		const sorroundings =
			sliceWithDefault(world, sorroundingsBounds.x.min, sorroundingsBounds.x.max, defaultX)
			.map(c => sliceWithDefault(c, sorroundingsBounds.y.min, sorroundingsBounds.y.max, defaultY))
			.map(c => c.map(tile => {
				const type = tile.type.toString().padStart(3, "0");
				const humidity = tile.humidity.toString().padStart(3, "0");
				const temperature = tile.temperature.toString().padStart(3, "0");

				return `${type}${humidity}${temperature}`;
			}).join(""))
			.join("");

		const data = {
			status: "ok",
			playerLocations,
			sorroundingsBounds,
			sorroundings,
			sorroundingsBottomLeft: {
				x: Math.ceil(clients[clientId].position.x) - fov.width,
				y: Math.ceil(clients[clientId].position.y) - fov.height,
			},
			camera: clients[clientId].position,
			clientId,
		};

		socket.send(JSON.stringify(data));
	}
}

function receiveUpdate(clientId, msg) {
	const data = JSON.parse(msg.toString());
	wPressed[clientId] = data.keys.KeyW;
	clients[clientId].keys = data.keys;
}

function tick() {
	let now = Date.now();
	delta = now - lastTickStart;
	lastTickStart = Date.now();

	for (let clientId = 0; clientId < clients.length; clientId++) {
		if (clients[clientId] === undefined) {
			continue;
		}

		const acceleration = {
			x: 0,
			y: 0,
		};

		if (clients[clientId].keys.KeyW) {
			acceleration.y = playerAcceleration;
		}
		if (clients[clientId].keys.KeyS) {
			acceleration.y = -playerAcceleration;
		}
		if (clients[clientId].keys.KeyA) {
			acceleration.x = -playerAcceleration;
		}
		if (clients[clientId].keys.KeyD) {
			acceleration.x = playerAcceleration;
		}

		const newVelocity = {
			x: clients[clientId].velocity.x,
			y: clients[clientId].velocity.y,
		};

		newVelocity.x += acceleration.x;
		newVelocity.y += acceleration.y;

		newVelocity.x *= 0.75;
		newVelocity.y *= 0.75;

		const velocityChange = {
			x: newVelocity.x - clients[clientId].velocity.x,
			y: newVelocity.y - clients[clientId].velocity.y,
		};


		clients[clientId].velocity.x += velocityChange.x / 2;
		clients[clientId].velocity.y += velocityChange.y / 2;

		tryMoveX(clients[clientId].velocity.x * delta, clientId);
		tryMoveY(clients[clientId].velocity.y * delta, clientId);

		clients[clientId].velocity.x += velocityChange.x / 2;
		clients[clientId].velocity.y += velocityChange.y / 2;
	}

}

function tryMoveX(distance, clientId) {
	if (distance > 0) {
		for (let i = 0; i < distance; i += 0.001) {
			clients[clientId].position.x += 0.001;

			if (doCollision && isCollisionTile(tileAt(clients[clientId].position.x, clients[clientId].position.y))) {
				clients[clientId].position.x -= 0.001;
				break;
			}
		}
	}

	if (distance < 0) {
		for (let i = 0; i > distance; i -= 0.001) {
			clients[clientId].position.x -= 0.001;

			if (doCollision && isCollisionTile(tileAt(clients[clientId].position.x, clients[clientId].position.y))) {
				clients[clientId].position.x += 0.001;
				break;
			}
		}
	}
}

function tryMoveY(distance, clientId) {
	if (distance > 0) {
		for (let i = 0; i < distance; i += 0.001) {
			clients[clientId].position.y += 0.001;

			if (doCollision && isCollisionTile(tileAt(clients[clientId].position.x, clients[clientId].position.y))) {
				clients[clientId].position.y -= 0.001;
				break;
			}
		}
	}

	if (distance < 0) {
		for (let i = 0; i > distance; i -= 0.001) {
			clients[clientId].position.y -= 0.001;

			if (doCollision && isCollisionTile(tileAt(clients[clientId].position.x, clients[clientId].position.y))) {
				clients[clientId].position.y += 0.001;
				break;
			}
		}
	}
}

function isCollisionTile(tile) {
	if (tile === undefined) {
		return true;
	}

	return tile.type === 0;
}

function tileAt(x, y) {
	if (y >= worldHeight || x >= worldWidth || x < 0 || y < 0) {
		return undefined;
	}
	return world[Math.floor(x)][Math.floor(y)];
}

function getFreeClientId() {
	let clientId = -1;
	for (const potentialId in clients) {
		if (clients[potentialId] === undefined) {
			clientId = potentialId;
			break;
		}
	}

	return clientId;
}

function generateWorld() {
	const width = 300;
	const height = 300;
	const world = [];
	const seed = Math.floor(Math.random() * 1000);

	const terrainNoise = new FastNoiseLite();
	terrainNoise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
	terrainNoise.SetSeed(seed);

	const humidityNoise = new FastNoiseLite();
	const temperatureNoise = new FastNoiseLite();
	humidityNoise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
	humidityNoise.SetSeed(seed ** 2);

	temperatureNoise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
	temperatureNoise.SetSeed(seed ** 3);

	for (let x = 0; x < width; x++) {
		const col = [];
		
		for (let y = 0; y < height; y++) {
			const { type, humidity, temperature } = getTile(x, y, terrainNoise, humidityNoise, temperatureNoise);

			col.push({ type, humidity, temperature });
		}
		world.push(col);
	}

	return {
		world,
		width,
		height,
	};
}

function getTile(x, y, terrainNoise, humidityNoise, temperatureNoise) {
	const isLand = terrainNoise.GetNoise(x / 2, y / 2) >= -0.5;
	const humidity = Math.floor((humidityNoise.GetNoise(x / 2, y / 2) + 1) * (255 / 2));
	const temperature = Math.floor((temperatureNoise.GetNoise(x / 2, y / 2) + 1) * (255 / 2));

	return {
		type: isLand ? 1 : 0,
		humidity,
		temperature,
	};
}

function getWorld() {
	if (true || !existsSync("./world")) {
		const { world, width, height } = generateWorld();
		// const save = encodeSave(world, width, height);
		// writeFileSync("./world", save);

		return { world, height, width };
	}
	const save = readFileSync("./world");
	const { world: rawWorld, height, width }= decodeSave(save);
	const world = [];
	for (let i = 0; i < rawWorld.length; i++) {
		const y = i % width;
		const x = Math.floor(i / width);

		if (world[x] === undefined) {
			world[x] = [];
		}

		world[x][y] = rawWorld[i];
	}

	return { world, height, width };
}

function encodeSave(world, width, height) {
	return Buffer.from([width, height, ...world.flatMap(x => x)]);
}

function decodeSave(save) {
	const bytes = new Uint8Array(save);
	if (bytes.length < 2) {
		throw new Error("No world sizes found in save file (it is probably corrupted)");
	}

	const [width, height] = bytes;
	const totalSize = width * height;

	if (bytes.length < totalSize + 2) {
		throw new Error("The world data in the save file is incomplete (it is probably corrupted)");
	}

	if (bytes.length > totalSize + 2) {
		throw new Error("There is too much world data in your save file (it is probably corrupted)");
	}

	return {
		width,
		height,
		world: bytes.subarray(2)
	};
}

function sliceWithDefault(arr, min, max, def) {
	let result = arr.slice(Math.max(min, 0), Math.min(max, arr.length));
	if (min < 0) {
		for (; min < 0; min++) {
			result.unshift(def);
		}
	}

	if (max > arr.length) {
		for (; max > arr.length; max--) {
			result.push(def);
		}
	}

	return result;
}
