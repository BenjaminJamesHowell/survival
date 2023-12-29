export function lightTick(server) {
    const { minutes, hours } = server.time;
    const dayProgress = (hours * 60 + minutes) / (24 * 60);
    server.lightSources.natural.intensity = getNaturalLight(dayProgress);
    server.lightSources.players = [];
    server.lightSources.permanent = [];
}
function getNaturalLight(dayProgress) {
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
export function getLightUpdates(server, position) {
    // TODO: Make this only return close light sources
    const { natural, players, permanent } = server.lightSources;
    return {
        natural,
        sources: [...players, ...permanent],
    };
}
