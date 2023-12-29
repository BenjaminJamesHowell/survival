// This file can only be run in node. For the part that deals with the server
// logic, see server.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebSocketServer } from "ws";
import { readFileSync, existsSync } from "fs";
import { getUpdate, receiveUpdate, serverTick, setupServer } from "./server.js";
import { removePlayer, addPlayer, kickPlayer } from "./player.js";
import { createInterface } from "readline";
console.log("Loading server config");
if (!existsSync("./config.json")) {
    throw new Error("No config.json file could be found.");
}
// TODO: Do better validation later
const configContents = readFileSync("./config.json").toString();
const config = JSON.parse(configContents);
// Config server
const tickRate = 60;
const tickInterval = 1000 / tickRate;
const serverState = setupServer(config);
console.log("Server set up done");
const tickTimer = setInterval(() => serverTick(serverState), tickInterval);
// Open to traffic
const server = new WebSocketServer({
    port: config.port,
});
server.on("connection", connection => {
    const player = addPlayer(serverState, (message) => {
        connection.send(message);
    }, () => {
        clearInterval(updateTimer);
        connection.close();
    });
    console.log("New connection", player.id);
    // Send updates to the player
    const updateTimer = setInterval(() => {
        const data = getUpdate(serverState, player.id);
        connection.send(JSON.stringify(data));
    }, 1000 / 60);
    // Liseten for updates
    connection.on("message", msg => {
        receiveUpdate(serverState, player.id, msg.toString());
    });
    connection.on("close", () => {
        console.log("Connection closed:", player.id);
        clearInterval(updateTimer);
        removePlayer(serverState, player);
    });
});
console.log(`Server is running on port ${config.port}`);
const commands = new Map();
commands.set("alert", {
    description: "Send an alert to all players on the server",
    run: ([strDuration, ...words]) => {
        const duration = parseInt(strDuration);
        if (isNaN(duration)) {
            console.log("Syntax error: Expected integer duration");
            return;
        }
        // TODO: Actually implement this
    },
});
commands.set("quit", {
    description: "Shut down the server",
    run: () => {
        server.close();
        clearInterval(tickTimer);
        console.log("Server is disabled");
        process.exit(0);
    },
});
commands.set("kick", {
    description: "Kick a player off the server",
    run: ([strId]) => {
        const id = parseInt(strId);
        if (isNaN(id)) {
            console.log("Syntax error: Expected integer player id");
            return;
        }
        const target = serverState.players[id];
        if (target === undefined) {
            console.log("Argument error: This player is not on the server.");
            return;
        }
        kickPlayer(serverState, target);
    },
});
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});
function prompt(query) {
    return new Promise((resolve, _) => rl.question(query, resolve));
}
function promptCommand() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const input = (_a = (yield prompt(""))) === null || _a === void 0 ? void 0 : _a.split(" ");
            if (input === undefined) {
                console.log("No command given");
                continue;
            }
            const command = commands.get(input[0]);
            if (command === undefined) {
                console.log("Unknown command: ", input[0]);
                continue;
            }
            command.run(input.slice(1));
        }
    });
}
promptCommand();
