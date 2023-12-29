import { ServerState } from "./server.js";
import { Position } from "./world.js";

export type LightSources = {
	permanent: LightSource[];
	players: LightSource[];
	natural: {
		intensity: number;
	};
};

export type LightSource = {
	position: Position;
	intensity: number;
	direction: MaybeLightDirection;
};

export type MaybeLightDirection = LightDirection | LightNonDirectional;
export type LightDirection = {
	isDirectional: true;
	angle: number;
};
export type LightNonDirectional = {
	isDirectional: false;
};

export type LightUpdates = {
	natural: {
		intensity: number;
	};
	sources: LightSource[];
};

export function lightTick(server: ServerState) {
	const { minutes, hours } = server.time;
	const dayProgress = (hours * 60 + minutes) / (24 * 60);

	server.lightSources.natural.intensity = getNaturalLight(dayProgress);
	server.lightSources.players = [];
	server.lightSources.permanent = [];
}

function getNaturalLight(dayProgress: number) {
	if (dayProgress < 0.2672 || dayProgress > 0.7328) {
		return 0.1;
	}

	if (dayProgress < 0.3) {
		return 2 ** (-2 + 8 * dayProgress) - 1;
	}

	if (dayProgress > 0.7) {
		return 2 ** (6 - 8 * dayProgress) - 1;
	}

	return -((-2 + 4 * dayProgress) ** 2) + 1;
}

export function getLightUpdates(server: ServerState, position: Position): LightUpdates {
	// TODO: Make this only return close light sources
	const { natural, players, permanent } = server.lightSources;
	return {
		natural,
		sources: [...players, ...permanent],
	};
}
