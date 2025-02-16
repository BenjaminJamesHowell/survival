import { ServerState, ServerUpdate } from "./server.js";
import { Position } from "./world.js";
import { createInventory, Inventory } from "./item.js";

export type Player = {
	colour: string;
	position: Position;
	velocity: {
		x: number;
		y: number;
	};
	inventory: Inventory;
	id: number;
	isFlashlightEnabled: boolean;
	aimDirection: number;
	keys: Map<string, boolean>;
	pushMessage: (message: ServerUpdate) => void;
	closeConnection: () => void;
};

export type PlayerUpdate = {
	colour: string;
	position: Position;
};

export function addPlayer(
	server: ServerState,
	pushMessage: (message: ServerUpdate) => void,
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
		inventory: createInventory(),
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

	player.pushMessage(message);
	player.closeConnection();
	removePlayer(server, player);
}

