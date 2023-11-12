let inGame = false;

// Elements
const canvas = document.querySelector("#game");
const minimapCanvas = document.querySelector("#minimap");
// const minimapBorder = document.querySelector("#minimap-border");
const fpsCounter = document.querySelector("#fps");
const tpsCounter = document.querySelector("#tps");
const coloursLabels = Array.from(document.querySelectorAll("#colours label"));
const connectButton = document.querySelector("#connect-button");
const connectMenu = document.querySelector("#connect");
const gameUi = document.querySelector("#game-ui");
const ui = document.querySelector("#ui");
const colourInputs = document.querySelectorAll("#colours input");
const fullscreenMinimapToggle = document.querySelector("#fullscreen-minimap-toggle");
const zoomInMinimapButton = document.querySelector("#zoom-in-minimap");
const zoomOutMinimapButton  = document.querySelector("#zoom-out-minimap");
const minimapUi = document.querySelector("#minimap-ui");
const pauseToggle = document.querySelector("#pause-toggle");
const serverAddressInput = document.querySelector("#server-address");
const pauseUi = document.querySelector("#pause-ui");
const pauseResume = document.querySelector("#pause-resume");
const pauseExit = document.querySelector("#pause-exit");
const timeHoursDisplay = document.querySelector("#hours");
const timeMinutesDisplay = document.querySelector("#minutes");
const alertMessage = document.querySelector("#alert-message");
const alertType = document.querySelector("#alert-type");
const alertProgressInner = document.querySelector("#alert-progress-inner");
const alertOuter = document.querySelector("#alert-outer");

const ctx = canvas.getContext("2d");
const minimapCtx = minimapCanvas.getContext("2d");

// Menus
const playerColours = [
	"rgb(223,  96,  96)", // red
	"rgb(223, 223,  96)", // yellow
	"rgb(128, 223,  96)", // green
	"rgb( 96, 191, 223)", // light blue
	"rgb( 96, 128, 223)", // blue
	"rgb(159,  96, 223)", // purple
	"rgb(223,  96, 223)", // pink
];
coloursLabels.map((label, i) =>
	label.style.backgroundColor = playerColours[i],
);
connectButton.addEventListener("click", joinGame);
fullscreenMinimapToggle.addEventListener("click", toggleMapFullscreen);
pauseToggle.addEventListener("click", togglePause);
pauseResume.addEventListener("click", togglePause);
pauseExit.addEventListener("click", leaveGame);

addEventListener("keypress", onKeypress);
addEventListener("keydown", onKeydown);
addEventListener("keyup", onKeyup);
addEventListener("mousemove", onMousemove);

let alerts = [];

// Game
let keys;
let mouse;
let aimDirection;
let camera;
let cameraOffset;
let socket;
let playerLocations;
let clientId;
let sorroundings;
let colour;
let sorroundingsBottomLeft;
let isFullscreenMap;
let sorroundingsBounds;
let tileSize;
let delta;
let lastFrameStart;
let fps;
let tps;
let zoomLimits;
let worldWidth;
let worldHeight;
let avgFps;
let totalFrames;
let totalFps;
let renderMinimapTimer;
let sendUpdatesTimer;
let isFlashlightEnabled;
let isPaused;
let time;
let minimapTileSize;
let minimap;

async function joinGame() {
	if (inGame === true) {
		return;
	}
	inGame = true;
	setupGame();
	connectMenu.style.display = "none";
	gameUi.style.display = "block";
	ui.classList.add("hide");

	// Connect to the server
	const server = `ws://${serverAddressInput.value}`;
	await openWebSocket(server);

	const sendUpdateRate = 60;
	const sendUpdateIntervalMs = 1000 / sendUpdateRate;
	const renderMinimapRate = 10;
	const renderMinimapIntervalMs = 1000 / renderMinimapRate;

	// Start the game
	sendUpdatesTimer = setInterval(sendUpdates, sendUpdateIntervalMs);
	renderMinimapTimer = setInterval(renderMinimap, renderMinimapIntervalMs);
	requestAnimationFrame(frame);
}

function leaveGame() {
	if (isPaused) {
		togglePause();
	}

	if (!inGame) {
		return;
	}
	inGame = false;

	socket.close();
	clearInterval(sendUpdatesTimer);
	clearInterval(renderMinimapTimer);

	connectMenu.style.display = "block";
	gameUi.style.display = "none";
	ui.classList.remove("hide");
}

function setupGame() {
	keys = {
		KeyW: false,
		KeyA: false,
		KeyS: false,
		KeyD: false,
	};
	mouse = {
		x: 0,
		y: 0,
	};
	aimDirection = 0;
	camera = {
		x: 0,
		y: 0,
	};
	cameraOffset = {
		x: innerWidth / 2,
		y: innerHeight / 2,
	};
	clientId = -1;
	playerLocations = [];
	sorroundings = [];
	sorroundingsBottomLeft = {
		x: 0,
		y: 0,
	};
	isFullscreenMap = false;
	tileSize = 32;
	delta = 0;
	lastFrameStart = 0;
	fps = 0;
	tps = 0;
	totalFps = 0;
	avgFps = 0;
	totalFrames = 0;
	zoomLimits = {
		min: 24,
		max: 128,
	};
	worldWidth = 1200;
	worldHeight = 1200;
	isFlashlightEnabled = false;

	canvas.height = innerHeight;
	canvas.width = innerWidth;
	minimapTileSize = 1;
	minimap = [];
	for (let x = 0; x < worldWidth; x++) {
		minimap[x] = [];
		for (let y = 0; y < worldHeight; y++) {
			minimap[x][y] = undefined;
		}
	}

	time = 0;

	colour = 0;
	for (let i = 0; i < colourInputs.length; i++) {
		if (colourInputs[i].checked) {
			colour = i;
			break;
		}
	}
}

async function openWebSocket(server) {
	return new Promise((resolve, _) => {
		try {
			socket = new WebSocket(server);
		} catch (e) {
			addAlert(e, 3000, "ERROR");
			leaveGame();
			throw e;
		}

		socket.addEventListener("message", receiveUpdate);

		socket.addEventListener("error", _ => {
			addAlert("Connection error", 3000, "ERROR");
			leaveGame();
		});

		socket.addEventListener("open", () => {
			resolve(socket);
		});
	});
}

function receiveUpdate(msg) {
	const data = JSON.parse(msg.data);
	if (data.status === "error") {
		addAlert(data.message, 3000, "ERROR");
		leaveGame();
		return;
	}

	playerLocations = data.playerLocations;
	sorroundingsBottomLeft = data.sorroundingsBottomLeft;
	sorroundingsBounds = data.sorroundingsBounds;
	camera = data.camera;
	clientId = data.clientId;
	tps = data.tps;
	time = data.time;
	for (const { content, duration } of data.alerts) {
		addAlert(content, duration, "SERVER");
	}

	decodeSorroundings(data.sorroundings);
}

function decodeSorroundings(input) {
	let x = 0;
	let y = 0;
	let r = "";
	let g = "";
	let b = "";
	sorroundings = [];
	let height = 24 * 2;

	for (const char of input) {
		if (y === height) {
			x += 1;
			y = 0;
		}
		if (r.length !== 3) {
			r += char;
			continue;
		}
		if (g.length !== 3) {
			g += char;
			continue;
		}
		if (b.length !== 2) {
			b += char;
			continue;
		}

		b += char;
		if (sorroundings[x] === undefined) {
			sorroundings[x] = [];
		}
		sorroundings[x][y] = [
			parseInt(r),
			parseInt(g),
			parseInt(b),
		];
		y++;
		r = "";
		g = "";
		b = "";
	}

	return sorroundings;
}

function sendUpdates() {
	const data = {
		keys,
		colour,
		aimDirection,
		isFlashlightEnabled,
	};
	socket.send(JSON.stringify(data));
}

function renderMinimap() {
	minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);

	for (let x = 0; x < sorroundings.length; x++) {
		for (let y = 0; y < sorroundings[x].length; y++) {
			const mapX = x + sorroundingsBottomLeft.x;
			const mapY = y + sorroundingsBottomLeft.y;
			if (mapX < 0 || mapY < 0) {
				continue;
			}

			minimap[mapX][mapY] = sorroundings[x][y];

		}
	}

	if (!isFullscreenMap) {
		let minimapWidthTiles = 200;
		let minimapHeightTiles = 200;

		let minimapBottomLeft = {
			x: Math.floor(-minimapWidthTiles / 2),
			y: Math.floor(-minimapHeightTiles / 2),
		};
		let minimapTopRight = {
			x: Math.floor(minimapHeightTiles / 2),
			y: Math.floor(minimapWidthTiles / 2),
		};
		for (let xOffset = minimapBottomLeft.x; xOffset < minimapTopRight.x; xOffset++) {
			for (let yOffset = minimapBottomLeft.y; yOffset < minimapTopRight.y; yOffset++) {
				const x = xOffset + Math.floor(camera.x);
				const y = yOffset + Math.floor(camera.y);
				const data = minimap[x]?.[y];
				if (data === undefined) {
					continue;
				}

				const [r, g, b] = data;
				minimapCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
				minimapCtx.fillRect(
					xOffset * minimapTileSize + 100,
					minimapCanvas.height - (yOffset * minimapTileSize + 100),
					Math.round(minimapTileSize + 2),
					-Math.round(minimapTileSize + 2),
				);
			}
		}
	} else {
		minimapTileSize = 1;
		for (let x = 0; x < worldWidth; x++) {
			for (let y = 0; y < worldHeight; y++) {
				const data = minimap[x]?.[y];
				if (data === undefined) {
					continue;
				}
				
				const [r, g, b] = data;
				minimapCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
				minimapCtx.fillRect(
					x * minimapTileSize,
					minimapCanvas.height - y * minimapTileSize,
					Math.round(minimapTileSize + 2),
					-Math.round(minimapTileSize + 2),
				);
			}
		}
	}
}

function frame() {
	const now = Date.now();
	delta = now - lastFrameStart;
	lastFrameStart = Date.now();
	fps = 1000 / delta;

	fpsCounter.innerText = Math.round(fps).toString().padStart(3, "0");
	tpsCounter.innerText = Math.round(tps).toString().padStart(3, "0");

	const gameTime = new Date(time);
	timeHoursDisplay.innerText = gameTime.getHours().toString().padStart(2, "0");
	timeMinutesDisplay.innerText = gameTime.getMinutes().toString().padStart(2, "0");

	totalFps += fps;
	totalFrames++;
	avgFps = totalFps / totalFrames;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let x = 0; x < sorroundings.length; x++) {
		for (let y = 0; y < sorroundings[x].length; y++) {
			const [r, g, b] = sorroundings[x][y];
			const colour = `rgb(${r}, ${g}, ${b})`;

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
			(player.position.x - camera.x) * tileSize + cameraOffset.x - tileSize / 2 - 0.025 * tileSize,
			(player.position.y - camera.y) * tileSize + cameraOffset.y - tileSize / 2 - 0.025 * tileSize,
			tileSize + 0.05 * tileSize,
			tileSize + 0.05 * tileSize,
			"black",
		);
		drawRect(
			(player.position.x - camera.x) * tileSize + cameraOffset.x - tileSize / 2,
			(player.position.y - camera.y) * tileSize + cameraOffset.y - tileSize / 2,
			tileSize,
			tileSize,
			playerColours[player.colour],
		);
	}

	if (mouse.x >= 0 && mouse.y >= 0) {
		aimDirection = Math.atan(mouse.x / mouse.y);
	} else if (mouse.x < 0 && mouse.y > 0) {
		aimDirection = Math.atan(mouse.x / mouse.y) + 2 * Math.PI;
	} else if (mouse.x >= 0 && mouse.y < 0) {
		aimDirection = Math.atan(mouse.x / mouse.y) + Math.PI;
	} else {
		aimDirection = Math.atan(mouse.x / mouse.y) + Math.PI;
	}

	if (keys.Equal) {
		tileSize += 0.25 * delta;
	}
	if (keys.Minus) {
		tileSize -= 0.25 * delta;
	}

	if (tileSize > zoomLimits.max) {
		tileSize = zoomLimits.max;
	}

	if (tileSize < zoomLimits.min) {
		tileSize = zoomLimits.min;
	}

	if (zoomInMinimapButton === document.activeElement) {
		minimapTileSize += 0.01 * delta;
		zoomInMinimapButton.blur();
	}

	if (zoomOutMinimapButton === document.activeElement) {
		minimapTileSize -= 0.01 * delta;
		zoomOutMinimapButton.blur();
	}

	if (minimapTileSize < 1) {
		minimapTileSize = 1;
	}

	if (minimapTileSize > 10) {
		minimapTileSize = 10;
	}

	if (inGame) {
		requestAnimationFrame(frame);
	}
}

function drawRect(x, y, w, h, c) {
	ctx.fillStyle = c;
	ctx.fillRect(x, canvas.height - y, w, -h);
}

function toggleMapFullscreen() {
	isFullscreenMap = !isFullscreenMap;
	fullscreenMinimapToggle.blur();

	if (isFullscreenMap) {
		if (isPaused) {
			isFullscreenMap = false;
			return;
		}

		minimapUi.classList.add("big");
		minimapUi.classList.remove("small");

		minimapCanvas.width = innerWidth - 60;
		minimapCanvas.height = innerHeight - 60;
	} else {
		minimapUi.classList.remove("big");
		minimapUi.classList.add("small");

		minimapCanvas.width = 200;
		minimapCanvas.height = 200;
	}
}

function toggleFlashlight() {
	isFlashlightEnabled = !isFlashlightEnabled;
}

function togglePause() {
	pauseToggle.blur();
	isPaused = !isPaused;

	if (isPaused) {
		pauseUi.style.display = "block";

		if (isFullscreenMap) {
			toggleMapFullscreen();
		}
	} else {
		pauseUi.style.display = "none";
	}
}

function addAlert(content, duration, type) {
	alerts.push({ content, duration, type });

	if (alerts.length === 1) {
		sendAlert(0);
	}
}

async function sendAlert() {
	const { content, duration, type } = alerts[0];
	alertMessage.innerText = content;
	alertType.innerText = type;
	alertOuter.classList.remove("hide");
	alertProgressInner.animate([
		{ width: "0%" },
		{ width: "100%" },
	], {
		duration,
	});

	setTimeout(() => {
		alertOuter.classList.add("hide");

		alerts.shift();
		if (alerts.length > 0) {
			sendAlert();
		}
	}, duration);
}

function onKeypress({ code }) {
	if (!inGame) {
		return;
	}

	if (code === "KeyM") {
		toggleMapFullscreen();
	}

	if (code === "KeyQ") {
		toggleFlashlight();
	}

	if (code === "KeyE") {
		togglePause();
	}

}

function onKeydown({ code }) {
	if (!inGame) {
		return;
	}

	keys[code] = true;
}

function onKeyup({ code }) {
	if (!inGame) {
		return;
	}

	keys[code] = false;
}

function onMousemove({ clientX, clientY }) {
	if (!inGame) {
		return;
	}

	mouse.x = clientX - cameraOffset.x;
	mouse.y = innerHeight - clientY - cameraOffset.y;
}
