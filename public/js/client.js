import { decodeWorldUpdate } from "./world.js";
export function createClient(config) {
    return {
        config,
        world: {
            tiles: [],
            bottomLeft: {
                x: 0,
                y: 0,
            },
            fov: {
                width: 0,
                height: 0,
            },
        },
        camera: {
            x: 0,
            y: 0,
        },
        players: [],
        lightSources: {
            natural: {
                intensity: 0,
            },
            sources: [],
        },
        tps: 0,
        time: {
            hours: 0,
            minutes: 0,
        },
    };
}
export function receiveUpdate(client, message) {
    if (message.status === "error") {
        // TODO: Nicer error handling
        alert("Error" + message.message);
        return;
    }
    client.world = decodeWorldUpdate(message.world);
    client.camera = message.camera;
    client.players = message.players;
    client.lightSources = message.lightSources;
    client.tps = message.tps;
    client.time = message.time;
}
export function sendUpdate(client, keys) {
    const data = {
        keys: Object.fromEntries(keys),
        colour: client.config.colour,
    };
    client.config.sendMessage(JSON.stringify(data));
}
export function getTileLight(client, position) {
    const { natural, sources } = client.lightSources;
    let light = natural.intensity;
    for (const source of sources) {
        const xDistance = Math.abs(source.position.x - position.x);
        const yDistance = Math.abs(source.position.y - position.y);
        const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
        // TODO: Directional lights
        light += source.intensity / distance;
    }
    return light;
}
