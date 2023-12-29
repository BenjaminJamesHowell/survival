// Everything in this file should be able to run in a browser or in node. For
// the part of the server that deals with web sockets, see webserver.ts

import { Player, PlayerUpdate, getPlayerUpdates } from "./player.js";
import { EncodedWorldUpdate, Position, WorldConfig, WorldState, encodeWorldUpdate, getWorldUpdate } from "./world.js";
import { LightSources, lightTick, getLightUpdates, LightUpdates  } from "./light.js";
import { generateWorld } from "./worldgen.js";

// Server types
export type ServerState = {
	players: (Player | undefined)[];
	world: WorldState;
	config: ServerConfig;
	time: {
		seconds: number;
		minutes: number;
		hours: number;
	};
	tick: {
		lastTickStart: number;
		delta: number;
		tps: number;
	};
	lightSources: LightSources;
};

export type ServerConfig = {
	fov: {
		width: number;
		height: number;
	};
	port: number;
	world: WorldConfig;
	maxPlayers: number;
	playerAcceleration: number;
};

export type ServerUpdate = OkServerUpdate | ErrorServerUpdate;
export type OkServerUpdate = {
	status: "ok";
	players: PlayerUpdate[];
	world: EncodedWorldUpdate;
	camera: Position;
	lightSources: LightUpdates;
	time: {
		hours: number;
		minutes: number;
	};
	tps: number;
	// alerts: undefined[];
};
export type ErrorServerUpdate = {
	status: "error";
	type: "kicked";
	message: string;
};

export function setupServer(config: ServerConfig): ServerState {
	return {
		players: new Array(config.maxPlayers).fill(undefined),
		world: generateWorld(config.world),
		config,
		time: {
			seconds: 0,
			minutes: 0,
			hours: 12,
		},
		tick: {
			lastTickStart: Date.now(),
			delta: 0,
			tps: 0,
		},
		lightSources: {
			players: [],
			permanent: [],
			natural: {
				intensity: 0.5,
			},
		},
	};
}


export function serverTick(server: ServerState) {
	server.time.seconds += 1;
	if (server.time.seconds === 60) {
		server.time.minutes++;
		server.time.seconds = 0;
	}
	if (server.time.minutes === 60) {
		server.time.hours++;
		server.time.minutes = 0;
	}
	if (server.time.hours === 24) {
		server.time.hours = 0;
		server.time.minutes = 0;
		server.time.seconds = 0;
	}

	const realTime = Date.now();
	server.tick.delta = realTime - server.tick.lastTickStart;
	server.tick.lastTickStart = realTime;
	server.tick.tps = 1000 / server.tick.delta;

	lightTick(server);

	for (let id = 0; id < server.players.length; id++) {
		playerTick(server, id);
	}
}

function playerTick(server: ServerState, id: number) {
	const player = server.players[id];
	if (player === undefined) {
		return;
	}

	const acceleration = {
		x: 0,
		y: 0,
	};

	if (player.keys.get("KeyW")) {
		acceleration.y += server.config.playerAcceleration;
	}
	if (player.keys.get("KeyS")) {
		acceleration.y -= server.config.playerAcceleration;
	}
	if (player.keys.get("KeyD")) {
		acceleration.x += server.config.playerAcceleration;
	}
	if (player.keys.get("KeyA")) {
		acceleration.x -= server.config.playerAcceleration;
	}

	player.velocity.x += acceleration.x;
	player.velocity.y += acceleration.y;

	player.velocity.x *= 0.9;
	player.velocity.y *= 0.9;

	player.position.x += player.velocity.x;
	player.position.y += player.velocity.y;
}

export function getUpdate(server: ServerState, id: number): ServerUpdate {
	const player = server.players[id];
	if (player === undefined) {
		throw new Error("Player does not exist");
	}

	const worldUpdate = getWorldUpdate(server, player.position);
	const encodedWorldUpdate = encodeWorldUpdate(worldUpdate);

	const playerUpdates = getPlayerUpdates(server);
	const lightUpdates = getLightUpdates(server, player.position);

	return {
		status: "ok",
		players: playerUpdates,
		world: encodedWorldUpdate,
		camera: player.position,
		lightSources: lightUpdates,
		tps: server.tick.tps,
		time: {
			hours: server.time.hours,
			minutes: server.time.minutes,
		},
	};
}

export function receiveUpdate(server: ServerState, id: number, msg: string) {
	const player = server.players[id];
	if (player === undefined) {
		return;
	}

	const data = JSON.parse(msg);
	if (data.keys === undefined) {
		throw new Error("Invalid message received from client");
	}
	for (const key of Object.keys(data.keys)) {
		player.keys.set(key, data.keys[key]);
	}
	player.colour = data.colour;
}
