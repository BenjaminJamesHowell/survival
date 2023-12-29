import { ServerState, ServerUpdate } from "./server.js";

export type Player = {
	colour: string;
	position: {
		x: number;
		y: number;
	};
	velocity: {
		x: number;
		y: number;
	};
	id: number;
	isFlashlightEnabled: boolean;
	aimDirection: number;
	keys: Map<string, boolean>;
	pushMessage: (message: string) => void;
	closeConnection: () => void;
};

export type PlayerUpdate = {
	colour: string;
	position: {
		x: number;
		y: number;
	};
};

export function addPlayer(
	server: ServerState,
	pushMessage: (message: string) => void,
	closeConnection: () => void,
): Player {
	let id = 0;
	for (id = 0; id < server.players.length; id++) {
		if (server.players[id] === undefined) {
			break;
		}

		if (id === server.players.length - 1) {
			throw new Error("Server is full");
		}
	}

	const player: Player = {
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

export function removePlayer(server: ServerState, player: Player) {
	server.players[player.id] = undefined;
}

export function getPlayerUpdates(server: ServerState): PlayerUpdate[] {
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

export function kickPlayer(server: ServerState, player: Player) {
	const message: ServerUpdate = {
		status: "error",
		type: "kicked",
		message: "You were kicked from the server!",
	};

	player.pushMessage(JSON.stringify(message));
	player.closeConnection();
	removePlayer(server, player);
}

