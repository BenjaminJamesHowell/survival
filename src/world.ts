import { ServerState } from "./server.js";

export type Position = {
	x: number;
	y: number;
};

export type Area = {
	x: {
		min: number;
		max: number;
	};
	y: {
		min: number;
		max: number;
	};
};
export type WorldState = {
	tiles: WorldTile[][];
	config: WorldConfig;
};
export type WorldTile = {
	type: TileType;
	humidity: number;
	temperature: number;
	alternate: number;
};

export type WorldUpdate = {
	tiles: TileType[][];
	bottomLeft: Position;
	fov: {
		width: number;
		height: number;
	};
};

export type EncodedWorldUpdate = {
	tiles: string;
	bottomLeft: Position;
	fov: {
		width: number;
		height: number;
	};
};

export type TileType = number;
export const tiles: Map<string, TileType> = new Map();
tiles.set("void", 0); // VOID.
tiles.set("water", 1); // ocean
tiles.set("grass", 2); // hot plains, forest, dense forst
tiles.set("cold_grass", 3); // cold plains, ice plains, ice forst, dense ice forest
tiles.set("snow", 4); // ice plains, ice forst, dense ice forst
tiles.set("ice", 5); // replaces some water in ice biomes
tiles.set("hot_grass", 6); // savanna, swamp, jungle
tiles.set("swamp_water", 7); // swamp
tiles.set("sand", 8); // desert

export const tileColours: Map<TileType, [number, number, number]> = new Map();
tileColours.set(0, [0, 0, 0]);
tileColours.set(1, [52, 152, 219]);
tileColours.set(2, [39, 174, 96]);
tileColours.set(3, [69, 179, 157]);
tileColours.set(4, [236, 240, 241]);
tileColours.set(5, [174, 214, 241]);
tileColours.set(6, [24, 106, 59]);
tileColours.set(7, [11, 83, 69]);
tileColours.set(8, [244, 208, 63]);

export type WorldConfig = {
	height: number;
	width: number;
	seed: number;
	oceaness: number;
	extremeness: number;
	humidity: number;
	temperature: number;
};

export function getTileId(name: string): number {
	const id = tiles.get(name);
	if (id === undefined) {
		throw new Error("Tile does not exist");
	}

	return id;
}


export function getWorldUpdate(server: ServerState, perspective: Position): WorldUpdate {
	const { config } = server;
	const { fov } = config;
	// TODO: Make it so the fov is not doubled
	const bottomLeft: Position = {
		x: Math.ceil(perspective.x) - fov.width,
		y: Math.ceil(perspective.y) - fov.height,
	};
	const bounds: Area = {
		x: {
			min: Math.ceil(perspective.x) - fov.width,
			max: Math.ceil(perspective.x) + fov.width,
		},
		y: {
			min: Math.ceil(perspective.y) - fov.height,
			max: Math.ceil(perspective.y) + fov.height,
		},
	};

	const emptyTile: WorldTile = {
		type: 0,
		humidity: 0,
		temperature: 0,
		alternate: 0,
	};
	const emptyCol: WorldTile[] =
		new Array(config.world.height)
		.fill(emptyTile);
	
	// Remove out of fov cols
	const sorroundingCols = sliceWithDefault(
		server.world.tiles,
		bounds.x.min,
		bounds.x.max,
		emptyCol,
	);

	// Remove out of fov rows
	const sorroundingTiles = sorroundingCols.map((col) =>
		sliceWithDefault(
			col,
			bounds.y.min,
			bounds.y.max,
			emptyTile,
		)
	);

	// Only give the TileType not other data in WorldTile
	const sorroundingTileTypes: TileType[][] =
		sorroundingTiles.map(col =>
			col.map(({ type }) => type)
		);

	return {
		tiles: sorroundingTileTypes,
		bottomLeft,
		fov: config.fov,
	};
}

export function encodeWorldUpdate({ tiles, bottomLeft, fov }: WorldUpdate): EncodedWorldUpdate {
	let encodedTiles = "";

	for (const col of tiles) {
		for (const tile of col) {
			encodedTiles += tile.toString().padStart(3, "0");
		}
	}

	return {
		tiles: encodedTiles,
		bottomLeft,
		fov,
	};
}

export function decodeWorldUpdate({ tiles, bottomLeft, fov }: EncodedWorldUpdate): WorldUpdate {
	let decodedTiles: TileType[][] = [];

	let currentTile = "";
	let x = 0;
	let y = 0;
	for (let i = 0; i < tiles.length; i++) {
		const char = tiles[i];

		if (currentTile.length < 2) {
			currentTile += char;
			continue;
		}

		if (currentTile.length === 2) {
			currentTile += char;
			if (decodedTiles[x] === undefined) {
				decodedTiles[x] = [];
			}
			decodedTiles[x][y] = parseInt(currentTile);

			currentTile = "";
			y++;
			if (y === fov.height * 2) {
				y = 0;
				x++;
			}
		}
	}

	return {
		bottomLeft,
		fov,
		tiles: decodedTiles,
	};
}

function sliceWithDefault<T>(arr: T[], min: number, max: number, def: T): T[] {
	let result = arr.slice(Math.max(min, 0), Math.min(max, arr.length));
	if (min < 0) {
		for (; min < 0; min++) {
			result.unshift(def);
		}
	}

	if (max > arr.length) {
		for (; max > arr.length; max--) {
			result.push(def);
		}
	}

	return result;
}
