import { LightUpdates } from "./light.js";
import { PlayerUpdate } from "./player.js";
import { ServerUpdate } from "./server.js";
import { Position, WorldUpdate, decodeWorldUpdate } from "./world.js";

export type ClientState = {
	config: ClientConfig;
	world: WorldUpdate;
	camera: Position;
	players: PlayerUpdate[];
	lightSources: LightUpdates;
	tps: number;
	time: {
		hours: number;
		minutes: number;
	};
};

export type ClientUpdate = {
	keys: Map<string, boolean>;
	colour: string;
};

export type ClientConfig = {
	sendMessage: (update: ClientUpdate) => void;
	colour: string;
};

export function createClient(config: ClientConfig): ClientState {
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

export function receiveUpdate(client: ClientState, message: ServerUpdate) {
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

export function sendUpdate(client: ClientState, keys: Map<string, boolean>) {
	const update: ClientUpdate = {
		keys: keys,
		colour: client.config.colour,
	};

	client.config.sendMessage(update);
}

export function getTileLight(client: ClientState, position: Position): number {
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

