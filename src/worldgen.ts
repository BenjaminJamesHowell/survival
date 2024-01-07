import alea from "alea";
import { Biome, DecorationType, TileType, WorldConfig, WorldState, WorldTile, getTileId, grassTypes } from "./world.js";
import { NoiseFunction2D, createNoise2D } from "simplex-noise";

export function generateWorld(config: WorldConfig): WorldState {
	const tiles: WorldTile[][] = [];

	const terrainSeed = alea(config.seed); 
	const terrainNoise = createNoise2D(terrainSeed);

	const humiditySeed = alea(config.seed + 1); 
	const humidityNoise = createNoise2D(humiditySeed);
	
	const temperatureSeed = alea(config.seed + 2); 
	const temperatureNoise = createNoise2D(temperatureSeed);

	const alternateSeed = alea(config.seed + 3);
	const alternateNoise = createNoise2D(alternateSeed);

	for (let x = 0; x < config.width; x++) {
		const col = [];

		for (let y = 0; y < config.height; y++) {
			col.push(getTile(
				x,
				y,
				terrainNoise,
				humidityNoise,
				temperatureNoise,
				alternateNoise,
				config,
			));
			
		}

		tiles.push(col);
	}

	return {
		tiles,
		config,
	};
}

function getTile(
	x: number,
	y: number,
	terrainNoise: NoiseFunction2D,
	humidityNoise: NoiseFunction2D,
	temperatureNoise: NoiseFunction2D,
	alternateNoise: NoiseFunction2D,
	config: WorldConfig,
): WorldTile {
	const { extremeness, oceaness } = config;

	const elevation =
		terrainNoise(x * extremeness, y * extremeness)
		+ temperatureNoise(x * extremeness * 2, y * extremeness * 2) / 2
		+ humidityNoise(x * extremeness * 4, y * extremeness * 4) / 4;
	
	const isLand = !(elevation >= -(oceaness / 2) && elevation < oceaness / 2);

	const humidity =
		humidityNoise(x * extremeness, y * extremeness)
		+ terrainNoise(x * extremeness * 2, y * extremeness * 2) / 2
		+ temperatureNoise(x * extremeness * 4, y * extremeness * 4) / 4;

	const temperature =
		temperatureNoise(x * extremeness, y * extremeness)
		+ humidityNoise(x * extremeness * 2, y * extremeness * 2) / 2
		+ terrainNoise(x * extremeness * 4, y * extremeness * 4) / 4;

	const alternate = alternateNoise(x ^ 2, y ^ 2);

	const wierdness = config.wierdness;

	const type = getTileType(
		config,
		isLand,
		elevation,
		temperature,
		humidity,
		wierdness,
		alternate,
	);

	return {
		type,
		humidity,
		temperature,
		alternate,
	};
}

function getTileType(
	config: WorldConfig,
	isLand: boolean,
	elevation: number,
	temperature: number,
	humidity: number,
	wierdness: number,
	alternate: number,
): TileType {
	const biome = getBiome(
		config,
		elevation,
		temperature,
		humidity,
		wierdness,
	);

	if (!isLand) {
		return getWater(biome, alternate);
	}

	const decoration = getDecoration(biome, humidity, alternate);
	if (decoration !== "none") {
		return getTileId(decoration);
	}

	const grassType = grassTypes.get(biome);
	if (grassType === undefined) {
		throw new Error("There is no grass type for this biome");
	}

	return grassType;
}

function getDecoration(
	biome: Biome, 
	humidity: number,
	alternate: number,
): DecorationType {
	let chance = 0;
	if (biome === "jungle" || biome === "dense_forest" || biome === "dense_ice_forest") {
		chance += 0.15;
	}

	if (biome === "forest" || biome === "ice_forest" || biome === "swamp") {
		chance += 0.05;
	}

	if (biome === "savanna" || biome === "hot_plains" || biome === "cold_plains" || biome === "ice_plains") {
		chance += 0.02;
	}

	if (biome === "desert") {
		chance = 0;
	}

	if (chance > (alternate + 1) / 2) {
		return "tree";
	}

	return "none";
}

export function getBiome(
	config: WorldConfig,
	elevation: number,
	temperature: number,
	humidity: number,
	wierdness: number,
): Biome {
	const isHot
		= temperature >= wierdness;
	const isWarm
		= temperature < wierdness
		&& temperature >= 0;
	const isCold
		= temperature < 0
		&& temperature >= -wierdness;
	const isIcy
		= temperature < -wierdness;
	
	const isVeryHighHumid
		= humidity >= wierdness;
	const isHighHumid
		= humidity >= 0
		&& humidity < wierdness;
	const isLowHumid
		= humidity >= -wierdness
		&& humidity < 0;
	const isVeryLowHumid
		= humidity < -wierdness;

	const { oceaness, beachness } = config;
	const isBeach =
		(elevation >= oceaness / 2
		&& elevation < oceaness / 2 + beachness)
		|| (elevation < -oceaness / 2
		&& elevation >= -oceaness / 2 - beachness);
	
	if (isBeach) {
		if (isHot || isWarm) {
			return "sand_beach";
		}
		if (isCold) {
			return "pebble_beach";
		}
		if (isIcy) {
			return "ice_beach";
		}
	}
	
	if (isVeryLowHumid) {
		if (isHot) {
			return "desert";
		}
		if (isWarm) {
			return "hot_plains";
		}
		if (isCold) {
			return "cold_plains";
		}
		if (isIcy) {
			return "ice_plains";
		}
	}

	if (isLowHumid) {
		if (isHot) {
			return "savanna";
		}
		if (isWarm) {
			return "hot_plains";
		}
		if (isCold) {
			return "cold_plains";
		}
		if (isIcy) {
			return "ice_plains";
		}
	}

	if (isHighHumid) {
		if (isHot) {
			return "swamp";
		}
		if (isWarm) {
			return "forest";
		}
		if (isCold) {
			return "forest";
		}
		if (isIcy) {
			return "ice_forest";
		}
	}

	if (isVeryHighHumid) {
		if (isHot) {
			return "jungle";
		}
		if (isWarm) {
			return "dense_forest";
		}
		if (isCold) {
			return "dense_forest";
		}
		if (isIcy) {
			return "dense_ice_forest";
		}
	}

	throw new Error("Could not determine biome type"); 
}


function getWater(biome: Biome, alternate: number): TileType {
	if (biome === "swamp" && alternate > -0.7) {
		return getTileId("swamp_water");
	}

	if (
		(biome === "ice_plains"
		|| biome === "ice_forest"
		|| biome === "dense_ice_forest")
		&& alternate > -0.8
	) {
		return getTileId("ice");
	}

	return getTileId("water");
}

