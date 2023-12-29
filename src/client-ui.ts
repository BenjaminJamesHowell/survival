import { ClientConfig, ClientState, createClient, getTileLight, receiveUpdate as clientReceiveUpdate, sendUpdate } from "./client.js";
import { ServerUpdate, getUpdate, serverTick, setupServer, receiveUpdate as serverReceiveUpdate, ServerConfig } from "./server.js";
import { tileColours } from "./world.js";
import { addPlayer } from "./player.js";

const elements = getElements([
	"#game",
	"#minimap",
	"#fps",
	"#tps",
	"#menu-tabs",
	"#multiplayer-start-button",
	"#singleplayer-start-button",
	"#singleplayer-menu",
	"#multiplayer-menu",
	"#singleplayer-menu-open-button",
	"#multiplayer-menu-open-button",
	"#game-ui",
	"#ui",
	"#fullscreen-minimap-toggle",
	"#zoom-in-minimap",
	"#zoom-out-minimap",
	"#minimap-ui",
	"#pause-toggle",
	"#server-address",
	"#pause-ui",
	"#pause-resume",
	"#pause-exit",
	"#hours",
	"#minutes",
	"#alert-outer",
	"#alert-message",
	"#alert-type",
	"#alert-progress-inner",
	"#alert-progress-outer",
	"#team-colour",
	"#loading",
	"#cancel-loading",
]);

const canvas = getElement("#game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let tileSize = 16;
const cameraOffset = {
	x: innerWidth / 2,
	y: innerHeight / 2,
};
let keys = new Map();
let isInGame = false;

let fps = 0;
let delta = 0;
let lastFrameStart = 0;

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("keydown", ({ code }) => {
	keys.set(code, true);
});
addEventListener("keyup", ({ code }) => {
	keys.set(code, false);
});

singleplayerMenu();
getElement("#multiplayer-start-button").addEventListener("click", multiplayer);
getElement("#singleplayer-start-button").addEventListener("click", singleplayer);
getElement("#singleplayer-menu-open-button").addEventListener("click", singleplayerMenu);
getElement("#multiplayer-menu-open-button").addEventListener("click", multiplayerMenu);

function getElements(selectors: string[]): Map<string, Element> {
	const result: Map<string, Element> = new Map();

	for (const selector of selectors) {
		const element = document.querySelector(selector);

		if (element === null) {
			throw new Error(`Could not find element: ${selector}`);
		}

		result.set(selector, element);
	}

	return result;
}

function getElement(selector: string): HTMLElement {
	const element = elements.get(selector);

	if (element === undefined) {
		throw new Error(`Could not find element: ${selector}`); 
	}

	return element as HTMLElement;
}

function showElement(element: Element) {
	element.classList.add("show");
	element.classList.remove("hide");
}
function hideElement(element: Element) {
	element.classList.add("hide");
	element.classList.remove("show");
}

function singleplayerMenu() {
	hideElement(getElement("#game-ui"));
	hideElement(getElement("#pause-ui"));
	hideElement(getElement("#loading"));
	showElement(getElement("#ui"));
	showElement(getElement("#singleplayer-menu"));
	showElement(getElement("#menu-tabs"));
	hideElement(getElement("#multiplayer-menu"));
}

function multiplayerMenu() {
	hideElement(getElement("#game-ui"));
	hideElement(getElement("#pause-ui"));
	hideElement(getElement("#loading"));
	showElement(getElement("#ui"));
	hideElement(getElement("#singleplayer-menu"));
	showElement(getElement("#menu-tabs"));
	showElement(getElement("#multiplayer-menu"));
}

function loadingMenu() {
	hideElement(getElement("#game-ui"));
	hideElement(getElement("#pause-ui"));
	showElement(getElement("#ui"));
	showElement(getElement("#loading"));
	hideElement(getElement("#multiplayer-menu"));
	hideElement(getElement("#menu-tabs"));
	hideElement(getElement("#singleplayer-menu"));
}

function inGame() {
	hideElement(getElement("#ui"));
	hideElement(getElement("#multiplayer-menu"));
	hideElement(getElement("#singleplayer-menu"));
	hideElement(getElement("#loading"));
	showElement(getElement("#game-ui"));
	hideElement(getElement("#pause-ui"));
}

function singleplayer() {
	if (isInGame) {
		return;
	}
	isInGame = true;
	loadingMenu();

	const serverConfig: ServerConfig = {
		port: 0,
		world: {
			height: 1000,
			width: 1000,
			seed: 1,
			oceaness: 0.7,
			extremeness: 0.001,
			humidity: 0,
			temperature: 0,
		},
		fov: {
			width: 41,
			height: 21,
		},
		maxPlayers: 1,
		playerAcceleration: 0.05,
	};
	const server = setupServer(serverConfig);

	const player = addPlayer(
		server,
		(message) => {
			// Send alert to client
			clientReceiveUpdate(client, message);
		},
		() => {
			// Called when the player disconnects
		},
	);

	const colour = "red";
	const clientConfig: ClientConfig = {
		sendMessage: msg => {
			// Send a message to the server
			serverReceiveUpdate(server, player.id, msg);
		},
		colour,
	};
	const client = createClient(clientConfig);

	setTimeout(inGame, 1000);
	renderWorld(client);
	setInterval(() => {
		// Client sends update to server
		sendUpdate(client, keys)

		// Server tick
		serverTick(server);

		// Server sends update to client
		const update = getUpdate(server, player.id);
		clientReceiveUpdate(client, update);

		if (keys.get("Equal")) {
			tileSize++;
		}
		if (keys.get("Minus")) {
			tileSize--;
		}

		if (tileSize > 70) {
			tileSize = 70;
		}
		if (tileSize < 10) {
			tileSize = 10;
		}
	}, 1000 / 60);
}

function multiplayer() {
	if (isInGame) {
		return;
	}
	isInGame = true;
	loadingMenu();

	const colourBox = getElement("#team-colour") as HTMLInputElement;
	const colour = colourBox.value;

	const serverAddress = getElement("#server-address") as HTMLInputElement;
	const server = `ws://${serverAddress.value}`;
	const socket = new WebSocket(server);

	const config: ClientConfig = {
		sendMessage: update => {
			// The map needs to be converted to be encoded properly
			socket.send(JSON.stringify({
				...update,
				keys: Object.fromEntries(update.keys),
			}))
		},
		colour,
	};
	const client = createClient(config);

	socket.addEventListener("error", () => {
		isInGame = false;
		displayAlert("error", "Connection Error");
		singleplayerMenu();
		return;
	});
	socket.addEventListener("message", ({ data }) => {
		// TODO: JSON error handling
		const update = JSON.parse(data) as ServerUpdate;
		clientReceiveUpdate(client, update);
	});
	socket.addEventListener("open", () => {
		inGame();

		renderWorld(client);
		setInterval(() => {
			sendUpdate(client, keys)

			if (keys.get("Equal")) {
				tileSize++;
			}
			if (keys.get("Minus")) {
				tileSize--;
			}

			if (tileSize > 70) {
				tileSize = 70;
			}
			if (tileSize < 10) {
				tileSize = 10;
			}
		}, 1000 / 60);
	});
}

function renderWorld(client: ClientState) {
	const time = Date.now();
	delta = time - lastFrameStart;
	lastFrameStart = time;
	fps = 1000 / delta;

	const { camera, players } = client;
	const { tiles, bottomLeft } = client.world;
	ctx.globalAlpha = 1;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (let x = 0; x < tiles.length; x++) {
		const col = tiles[x];
		for (let y = 0; y < col.length; y++) {
			const type = col[y];

			const colour = tileColours.get(type);
			if (colour === undefined) {
				throw new Error("This tile does not exist");
			}

			const light = getTileLight(
				client,
				{
					x: x + bottomLeft.x,
					y: y + bottomLeft.y,
				},
			);

			ctx.globalAlpha = light;
			const [r, g, b] = colour.map(channel => channel);
			const colourStr = `rgb(${r}, ${g}, ${b})`;

			drawRect(
				(x + bottomLeft.x - camera.x) * tileSize + cameraOffset.x,
				(y + bottomLeft.y - camera.y) * tileSize + cameraOffset.y,
				tileSize,
				tileSize,
				colourStr,
			);
		}
	}

	for (const player of players) {
		const light = getTileLight(
			client,
			player.position,
		);
		ctx.globalAlpha = 1;
		drawRect(
			(player.position.x - camera.x) * tileSize + cameraOffset.x,
			(player.position.y - camera.y) * tileSize + cameraOffset.y,
			tileSize,
			tileSize,
			"black",
		);
		ctx.globalAlpha = light;
		drawRect(
			(player.position.x - camera.x) * tileSize + cameraOffset.x,
			(player.position.y - camera.y) * tileSize + cameraOffset.y,
			tileSize,
			tileSize,
			player.colour,
		);
	}

	(getElement("#fps") as HTMLElement).innerText = `${Math.round(fps)}`.padStart(3, " ");
	(getElement("#tps") as HTMLElement).innerText = `${Math.round(client.tps)}`.padStart(3, " ");
	(getElement("#hours") as HTMLElement).innerText = `${client.time.hours}`.padStart(2, "0");
	(getElement("#minutes") as HTMLElement).innerText = `${client.time.minutes}`.padStart(2, "0");

	requestAnimationFrame(() => renderWorld(client));
}

function drawRect(x: number, y: number, w: number, h: number, c: string) {
	if (x + w < 0 || x > innerWidth || y + h < 0 || y > innerHeight) {
		return;
	}

	ctx.fillStyle = c;
	ctx.fillRect(Math.round(x), canvas.height - Math.round(y), Math.round(w), Math.round(-h));
}

function displayAlert(type: string, message: string) {
	getElement("#alert-type").innerText = type;
	getElement("#alert-message").innerText = message;

	showElement(getElement("#alert-outer"));

	getElement("#alert-progress-inner").animate(
		[{ width: "0%" }, { width: "100%" }],
		{ easing: "linear", duration: 3000 },
	).play();

	setTimeout(() => {
		hideElement(getElement("#alert-outer"));
	}, 3000);
}

