export function addPlayer(server, pushMessage, closeConnection) {
    let id = 0;
    for (id = 0; id < server.players.length; id++) {
        if (server.players[id] === undefined) {
            break;
        }
        if (id === server.players.length - 1) {
            throw new Error("Server is full");
        }
    }
    const player = {
        colour: "red",
        position: {
            x: 0,
            y: 0,
        },
        velocity: {
            x: 0,
            y: 0,
        },
        id,
        isFlashlightEnabled: true,
        keys: new Map(),
        aimDirection: 0,
        closeConnection,
        pushMessage,
    };
    server.players[id] = player;
    return player;
}
export function removePlayer(server, player) {
    server.players[player.id] = undefined;
}
export function getPlayerUpdates(server) {
    const updates = [];
    for (const player of server.players) {
        if (player === undefined) {
            continue;
        }
        updates.push({
            colour: player.colour,
            position: player.position,
        });
    }
    return updates;
}
export function kickPlayer(server, player) {
    const message = {
        status: "error",
        type: "kicked",
        message: "You were kicked from the server!",
    };
    player.pushMessage(JSON.stringify(message));
    player.closeConnection();
    removePlayer(server, player);
}
