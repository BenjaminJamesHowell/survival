import { createClient, getTileLight, receiveUpdate, sendUpdate } from "./client.js";
import { tileColours } from "./world.js";
const elements = getElements([
    "#game",
    "#minimap",
    "#fps",
    "#tps",
    "#connect-button",
    "#connect",
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
const canvas = getElement("#game");
const ctx = canvas.getContext("2d");
let tileSize = 16;
const cameraOffset = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};
let keys = new Map();
let isConnected = false;
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
mainMenu();
getElement("#connect-button").addEventListener("click", connect);
function getElements(selectors) {
    const result = new Map();
    for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element === null) {
            throw new Error(`Could not find element: ${selector}`);
        }
        result.set(selector, element);
    }
    return result;
}
function getElement(selector) {
    const element = elements.get(selector);
    if (element === undefined) {
        throw new Error(`Could not find element: ${selector}`);
    }
    return element;
}
function showElement(element) {
    element.classList.add("show");
    element.classList.remove("hide");
}
function hideElement(element) {
    element.classList.add("hide");
    element.classList.remove("show");
}
function mainMenu() {
    hideElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
    hideElement(getElement("#loading"));
    showElement(getElement("#ui"));
    showElement(getElement("#connect"));
}
function loadingMenu() {
    hideElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
    showElement(getElement("#ui"));
    showElement(getElement("#loading"));
    hideElement(getElement("#connect"));
}
function inGame() {
    hideElement(getElement("#ui"));
    hideElement(getElement("#connect"));
    hideElement(getElement("#loading"));
    showElement(getElement("#game-ui"));
    hideElement(getElement("#pause-ui"));
}
function connect() {
    if (isConnected) {
        return;
    }
    isConnected = true;
    loadingMenu();
    const colourBox = getElement("#team-colour");
    const colour = colourBox.value;
    const serverAddress = getElement("#server-address");
    const server = `ws://${serverAddress.value}`;
    const socket = new WebSocket(server);
    const config = {
        sendMessage: msg => socket.send(msg),
        colour,
    };
    const client = createClient(config);
    socket.addEventListener("error", () => {
        isConnected = false;
        displayAlert("error", "Connection Error");
        mainMenu();
        return;
    });
    socket.addEventListener("message", ({ data }) => {
        // TODO: JSON error handling
        const update = JSON.parse(data);
        receiveUpdate(client, update);
    });
    socket.addEventListener("open", () => {
        inGame();
        renderWorld(client);
        setInterval(() => {
            sendUpdate(client, keys);
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
function renderWorld(client) {
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
            const light = getTileLight(client, {
                x: x + bottomLeft.x,
                y: y + bottomLeft.y,
            });
            ctx.globalAlpha = light;
            const [r, g, b] = colour.map(channel => channel);
            const colourStr = `rgb(${r}, ${g}, ${b})`;
            drawRect((x + bottomLeft.x - camera.x) * tileSize + cameraOffset.x, (y + bottomLeft.y - camera.y) * tileSize + cameraOffset.y, tileSize, tileSize, colourStr);
        }
    }
    for (const player of players) {
        const light = getTileLight(client, player.position);
        ctx.globalAlpha = 1;
        drawRect((player.position.x - camera.x) * tileSize + cameraOffset.x, (player.position.y - camera.y) * tileSize + cameraOffset.y, tileSize, tileSize, "black");
        ctx.globalAlpha = light;
        drawRect((player.position.x - camera.x) * tileSize + cameraOffset.x, (player.position.y - camera.y) * tileSize + cameraOffset.y, tileSize, tileSize, player.colour);
    }
    getElement("#fps").innerText = `${Math.round(fps)}`.padStart(3, " ");
    getElement("#tps").innerText = `${Math.round(client.tps)}`.padStart(3, " ");
    getElement("#hours").innerText = `${client.time.hours}`.padStart(2, "0");
    getElement("#minutes").innerText = `${client.time.minutes}`.padStart(2, "0");
    requestAnimationFrame(() => renderWorld(client));
}
function drawRect(x, y, w, h, c) {
    if (x + w < 0 || x > innerWidth || y + h < 0 || y > innerHeight) {
        return;
    }
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x), canvas.height - Math.round(y), Math.round(w), Math.round(-h));
}
function displayAlert(type, message) {
    getElement("#alert-type").innerText = type;
    getElement("#alert-message").innerText = message;
    showElement(getElement("#alert-outer"));
    getElement("#alert-progress-inner").animate([{ width: "0%" }, { width: "100%" }], { easing: "linear", duration: 3000 }).play();
    setTimeout(() => {
        hideElement(getElement("#alert-outer"));
    }, 3000);
}
