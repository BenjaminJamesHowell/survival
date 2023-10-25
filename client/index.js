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
let colour;
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
const zoomLimits = {
	min: 24,
	max: 128,
};

const worldWidth = 600;
const worldHeight = 600;


canvas.width = innerWidth;
canvas.height = innerHeight;

const playerColours = [
	"rgb(223,  96,  96)", // red
	"rgb(223, 223,  96)", // yellow
	"rgb(128, 223,  96)", // green
	"rgb( 96, 191, 223)", // light blue
	"rgb( 96, 128, 223)", // blue
	"rgb(159,  96, 223)", // purple
	"rgb(223,  96, 223)", // pink
];

Array.from(document.querySelectorAll("#colours label")).map(
	(label, i) => label.style.backgroundColor = playerColours[i],
);

document.getElementById("connect-button").addEventListener("click", () => {
	if (inGame) {
		return;
	}

	const server = document.getElementById("server-address").value;
	openWebSocket(server)
		.then(() => {
			inGame = true;
			minimapCanvas.width = worldWidth;
			minimapCanvas.height = worldHeight;
			document.getElementById("connect").style.display = "none";
			document.getElementById("minimap-border").style.display = "block";
			document.getElementById("ui").classList.remove("show");
			// const colourId = document.querySelectorAll("#colours input").filter(a => a.checked);
			const colourInputs = document.querySelectorAll("#colours input");
			colour = 0;
			for (let i = 0; i < colourInputs.length; i++) {
				if (colourInputs[i].checked) {
					colour = i;
					break;
				}
			}

			setInterval(sendUpdates, sendUpdateIntervalMs);
			setInterval(renderMinimap, 1000);
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
		keys,
		colour,
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

function drawRect(x, y, w, h, c) {
	ctx.fillStyle = c;
	ctx.fillRect(x, canvas.height - y, w, -h);
}

function renderMinimap() {
	for (let x = 0; x < sorroundings.length; x++) {
		for (let y = 0; y < sorroundings[x].length; y++) {
			const [r, g, b] = sorroundings[x][y];
			minimapCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;

			minimapCtx.fillRect(x + sorroundingsBottomLeft.x, worldHeight - (y + sorroundingsBottomLeft.y), 1, -1);
		}
	}
	minimapCanvas.style.left = `${150 - camera.x}px`;
	minimapCanvas.style.top = `${150 - (600 - camera.y)}px`;
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

