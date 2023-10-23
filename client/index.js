const keys = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false,
};
let inGame = false;
let camera = {
	x: 0,
	y: 0,
};

// The camera needs to be offset by half the screen width so the player is
// placed in the centre of the screen.
let cameraOffset = {
	x: innerWidth / 2,
	y: innerHeight / 2,
};

// This is the length of the interval between sending inputs to the server.
// Higher rates will result in less input lag.
const sendUpdateRate = 60;
const sendUpdateIntervalMs = 1000 / sendUpdateRate;

// Server stuff
let clientId = -1;
let socket;
let playerLocations = [];
let sorroundings = [];
let sorroundingsBottomLeft = {
	x: 0,
	y: 0,
};

// Set up the canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas.getContext("2d");
let sorroundingsBounds;
let tileSize = 32;
// let minimap;
let minimapChanges = [];
const zoomLimits = {
	min: 24,
	max: 128,
};

const worldWidth = 300;
const worldHeight = 300;


canvas.width = innerWidth;
canvas.height = innerHeight;

document.getElementById("connect-button").addEventListener("click", () => {
	if (inGame) {
		return;
	}

	const server = document.getElementById("server-address").value;
	openWebSocket(server)
		.then(() => {
			inGame = true;
			minimap = createMinimap();
			document.getElementById("connect").style.display = "none";
			document.getElementById("ui").classList.remove("show");
			setInterval(sendUpdates, sendUpdateIntervalMs);
			setInterval(renderMinimap, 250);
			requestAnimationFrame(frame);
		});
});

addEventListener("keydown", ({ code }) => {
	keys[code] = true;
});

addEventListener("keyup", ({ code }) => {
	keys[code] = false;
});


async function openWebSocket(server) {
	return new Promise((res, _) => {
		try {
			socket = new WebSocket(server);
		} catch (e) {
			alert("connection error");
			throw e;
		}

		socket.addEventListener("open", () => {
			socket.addEventListener("message", receiveUpdate);
			res(socket);
		});

		socket.addEventListener("error", _ => {
			alert("connection error");
		});
	});
}

function sendUpdates() {
	const data = {
		keys
	};
	socket.send(JSON.stringify(data));
}

function receiveUpdate(msg) {
	const data = JSON.parse(msg.data);
	if (data.status === "error") {
		alert(data.message);
		return;
	}

	playerLocations = data.playerLocations;
	sorroundingsBottomLeft = data.sorroundingsBottomLeft;
	sorroundingsBounds = data.sorroundingsBounds;
	camera = data.camera;
	clientId = data.clientId;

	decodeSorroundings(data.sorroundings);
}

function frame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let x = 0; x < sorroundings.length; x++) {
		for (let y = 0; y < sorroundings[x].length; y++) {
			const { type, humidity, temperature } = sorroundings[x][y];
			const colour = getTileColour(type, humidity, temperature);

			drawRect(
				(x + sorroundingsBottomLeft.x - camera.x) * tileSize + cameraOffset.x,
				(y + sorroundingsBottomLeft.y - camera.y) * tileSize + cameraOffset.y,
				tileSize + 1,
				tileSize + 1,
				colour,
			);
		}
	}

	for (const player of playerLocations) {
		if (player === null) {
			continue;
		}


		drawRect(
			(player.position.x - camera.x) * tileSize + cameraOffset.x - tileSize / 2,
			(player.position.y - camera.y) * tileSize + cameraOffset.y - tileSize / 2,
			tileSize,
			tileSize,
			"red",
		);
	}


	if (keys.Equal) {
		tileSize += 8;
	}

	if (keys.Minus) {
		tileSize -= 8;
	}

	if (tileSize > zoomLimits.max) {
		tileSize = zoomLimits.max;
	}

	if (tileSize < zoomLimits.min) {
		tileSize = zoomLimits.min;
	}

	requestAnimationFrame(frame);
}

const colours = {
	grass: [0, 255, 0],
	snow: [255, 255, 255],
	sand: [255, 255, 0],
};

function colourToString([a1, a2, a3]) {
	return `rgb(${a1}, ${a2}, ${a3})`;
}

function blendChannel(a, b, weight) {
	return Math.round(a * weight + b * (1 - weight));
}

function blendColours([a1, a2, a3], [b1, b2, b3], weight) {
	return [
		blendChannel(a1, b1, weight),
		blendChannel(a2, b2, weight),
		blendChannel(a3, b3, weight),
	];
}

function getTileColour(tile, _, temperature) {
	if (tile === 0) {
		return "blue";
	}

	const temperaturePercent = temperature / 255;
	if (tile === 1) {
		if (temperaturePercent > 0.5) {
			return colourToString(blendColours(
				colours.sand,
				colours.grass,
				Math.floor(temperaturePercent * 20) / 20 * 2 - 1,
			));
		}

		return colourToString(blendColours(
			colours.grass,
			colours.snow,
			Math.floor(temperaturePercent * 20) / 20 * 2,
		));
	}

	return "black";
}

function drawRect(x, y, w, h, c) {
	ctx.fillStyle = c;
	ctx.fillRect(x, canvas.height - y, w, -h);
}

function createMinimap() {
	const minimap = [];
	for (let x = 0; x < 300; x++) {
		minimap[x] = [];

		for (let y = 0; y < 300; y++) {
			minimap[x][y] = undefined;
		}
	}

	return minimap;
}

function fillMinimap() {
	for (let x = 0; x < sorroundings.length; x++) {
		for (let y = 0; y < sorroundings[x].length; y++) {
			const { type, humidity, temperature } = sorroundings[x][y];
			if (type === 2) {
				continue;
			}

			minimapChanges.push({
				x: sorroundingsBottomLeft.x + x,
				y: sorroundingsBottomLeft.y + y,
				type,
				humidity,
				temperature,
			});
		}
	}
}

function renderMinimap() {
	for (let x = 0; x < sorroundings.length; x++) {
		for (let y = 0; y < sorroundings[x].length; y++) {
			const { type, humidity, temperature } = sorroundings[x][y];
			minimapCtx.fillStyle = getTileColour(
				type,
				humidity,
				temperature,
			);

			minimapCtx.fillRect(x + sorroundingsBottomLeft.x, 300 - (y + sorroundingsBottomLeft.y), 1, -1);
		}
	}
}

function decodeSorroundings(input) {
	let x = 0;
	let y = 0;
	let type = "";
	let humidity = "";
	let temperature = "";
	sorroundings = [];
	let height = 24 * 2;

	for (const char of input) {
		if (y === height) {
			x += 1;
			y = 0;
		}
		if (type.length !== 3) {
			type += char;
			continue;
		}
		if (humidity.length !== 3) {
			humidity += char;
			continue;
		}
		if (temperature.length !== 2) {
			temperature += char;
			continue;
		}

		temperature += char;
		if (sorroundings[x] === undefined) {
			sorroundings[x] = [];
		}
		sorroundings[x][y] = {
			type: parseInt(type),
			humidity: parseInt(humidity),
			temperature: parseInt(temperature),
		};
		y++;
		type = "";
		humidity = "";
		temperature = "";
	}

	return sorroundings;
}
