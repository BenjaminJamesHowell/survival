export const tiles = new Map();
tiles.set("void", 0); // VOID.
tiles.set("water", 1); // ocean
tiles.set("grass", 2); // hot plains, forest, dense forst
tiles.set("cold_grass", 3); // cold plains, ice plains, ice forst, dense ice forest
tiles.set("snow", 4); // ice plains, ice forst, dense ice forst
tiles.set("ice", 5); // replaces some water in ice biomes
tiles.set("hot_grass", 6); // savanna, swamp, jungle
tiles.set("swamp_water", 7); // swamp
tiles.set("sand", 8); // desert
export const tileColours = new Map();
tileColours.set(0, [0, 0, 0]);
tileColours.set(1, [52, 152, 219]);
tileColours.set(2, [39, 174, 96]);
tileColours.set(3, [69, 179, 157]);
tileColours.set(4, [236, 240, 241]);
tileColours.set(5, [174, 214, 241]);
tileColours.set(6, [24, 106, 59]);
tileColours.set(7, [11, 83, 69]);
tileColours.set(8, [244, 208, 63]);
export function getTileId(name) {
    const id = tiles.get(name);
    if (id === undefined) {
        throw new Error("Tile does not exist");
    }
    return id;
}
export function getWorldUpdate(server, perspective) {
    const { config } = server;
    const { fov } = config;
    // TODO: Make it so the fov is not doubled
    const bottomLeft = {
        x: Math.ceil(perspective.x) - fov.width,
        y: Math.ceil(perspective.y) - fov.height,
    };
    const bounds = {
        x: {
            min: Math.ceil(perspective.x) - fov.width,
            max: Math.ceil(perspective.x) + fov.width,
        },
        y: {
            min: Math.ceil(perspective.y) - fov.height,
            max: Math.ceil(perspective.y) + fov.height,
        },
    };
    const emptyTile = {
        type: 0,
        humidity: 0,
        temperature: 0,
        alternate: 0,
    };
    const emptyCol = new Array(config.world.height)
        .fill(emptyTile);
    // Remove out of fov cols
    const sorroundingCols = sliceWithDefault(server.world.tiles, bounds.x.min, bounds.x.max, emptyCol);
    // Remove out of fov rows
    const sorroundingTiles = sorroundingCols.map((col) => sliceWithDefault(col, bounds.y.min, bounds.y.max, emptyTile));
    // Only give the TileType not other data in WorldTile
    const sorroundingTileTypes = sorroundingTiles.map(col => col.map(({ type }) => type));
    return {
        tiles: sorroundingTileTypes,
        bottomLeft,
        fov: config.fov,
    };
}
export function encodeWorldUpdate({ tiles, bottomLeft, fov }) {
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
export function decodeWorldUpdate({ tiles, bottomLeft, fov }) {
    let decodedTiles = [];
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
function sliceWithDefault(arr, min, max, def) {
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
