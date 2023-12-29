import alea from "alea";
import { getTileId } from "./world.js";
import { createNoise2D } from "simplex-noise";
export function generateWorld(config) {
    const tiles = [];
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
            col.push(getTile(x, y, terrainNoise, humidityNoise, temperatureNoise, alternateNoise, config));
        }
        tiles.push(col);
    }
    return {
        tiles,
        config,
    };
}
function getTile(x, y, terrainNoise, humidityNoise, temperatureNoise, alternateNoise, config) {
    const { extremeness, oceaness } = config;
    const elevation = terrainNoise(x * extremeness, y * extremeness)
        + temperatureNoise(x * extremeness * 2, y * extremeness * 2) / 2
        + humidityNoise(x * extremeness * 4, y * extremeness * 4) / 4;
    const isLand = !(elevation >= -(oceaness / 2) && elevation < oceaness / 2);
    const humidity = humidityNoise(x * extremeness, y * extremeness)
        + terrainNoise(x * extremeness * 2, y * extremeness * 2) / 2
        + temperatureNoise(x * extremeness * 4, y * extremeness * 4) / 4;
    const temperature = temperatureNoise(x * extremeness, y * extremeness)
        + humidityNoise(x * extremeness * 2, y * extremeness * 2) / 2
        + terrainNoise(x * extremeness * 4, y * extremeness * 4) / 4;
    const alternate = alternateNoise(x, y);
    const wierdness = 0.34;
    const isDesert = temperature >= wierdness
        && humidity < -wierdness;
    const isSavanna = temperature >= wierdness
        && humidity >= -wierdness
        && humidity < 0;
    const isSwamp = temperature >= wierdness
        && humidity >= 0
        && humidity < wierdness;
    const isJungle = temperature >= wierdness
        && humidity >= wierdness;
    const isHotPlains = temperature >= 0
        && temperature < wierdness
        && humidity < 0;
    const isColdPlains = temperature >= -wierdness
        && temperature < 0
        && humidity < 0;
    const isNormalForest = temperature >= -wierdness
        && temperature < wierdness
        && humidity >= 0
        && humidity < wierdness;
    const isDenseForest = temperature >= -wierdness
        && temperature < wierdness
        && humidity >= wierdness;
    const isIcePlains = temperature < -wierdness
        && humidity < 0;
    const isIceForest = temperature < -wierdness
        && humidity >= 0
        && humidity < wierdness;
    const isDenseIceForest = temperature < -wierdness
        && humidity >= wierdness;
    if (!isLand) {
        if (isSwamp && alternate > -0.7) {
            return {
                type: getTileId("swamp_water"),
                humidity,
                temperature,
                alternate,
            };
        }
        if ((isIcePlains || isIceForest || isDenseIceForest) && alternate > -0.8) {
            return {
                type: getTileId("ice"),
                humidity,
                temperature,
                alternate,
            };
        }
        return {
            type: getTileId("water"),
            humidity,
            temperature,
            alternate,
        };
    }
    if (isHotPlains || isColdPlains || isNormalForest || isDenseForest) {
        return {
            type: getTileId("grass"),
            humidity,
            temperature,
            alternate,
        };
    }
    if (isColdPlains || (alternate > -0.90 && (isIcePlains || isIceForest || isDenseIceForest))) {
        return {
            type: getTileId("cold_grass"),
            humidity,
            temperature,
            alternate,
        };
    }
    if (isIcePlains || isIceForest || isDenseIceForest) {
        return {
            type: getTileId("snow"),
            humidity,
            temperature,
            alternate,
        };
    }
    if (isDesert || (alternate > 0.9 && isSavanna)) {
        return {
            type: getTileId("sand"),
            humidity,
            temperature,
            alternate,
        };
    }
    if (isSavanna || isSwamp || isJungle) {
        return {
            type: getTileId("hot_grass"),
            humidity,
            temperature,
            alternate,
        };
    }
    return {
        type: getTileId("void"),
        humidity,
        temperature,
        alternate,
    };
}
