const { config } = require("..");
const { executeCommand } = require("../handlers/utils");
const { log } = require("../logs");
const wait = require("node:timers/promises").setTimeout;
const packetsData = require('minecraft-data')(config.server.version)
const axios = require("axios")

module.exports = async (server, client) => {
    // Send client login packet
    const loginPacket = packetsData.loginPacket
    client.write('login', {
        entityId: client.id,
        isHardcore: false,
        gameMode: 0,
        previousGameMode: 255,
        worldNames: loginPacket.worldNames,
        dimensionCodec: loginPacket.dimensionCodec,
        dimension: loginPacket.dimension,
        worldName: 'minecraft:overworld',
        hashedSeed: [0, 0],
        maxPlayers: server.maxPlayers,
        viewDistance: 10,
        reducedDebugInfo: false,
        enableRespawnScreen: true,
        isDebug: false,
        isFlat: false
    });

    // Send client position packet
    client.write('position', {
        x: 0,
        y: 100,
        z: 0,
        yaw: 0,
        pitch: 0,
        flags: 0x00
    });

    // Check if the user's ip is whitelisted
    const isWhitelisted = config.whitelist.some(ip => ip === client.socket.remoteAddress);

    // Log info to console and discord
    log(`Player ${client.username} (${client.uuid}) joined the server. IP Address: ${client.socket.remoteAddress}. Is whitelisted? ${isWhitelisted}`)

    if (config.webhook.enabled) {
        const embeds = [
            JSON.parse(JSON.stringify(config.webhook.message.embed)
            .replaceAll("%username%", client.username)
            .replaceAll("%ip%", client.socket.remoteAddress)
            .replaceAll("%whitelist%", isWhitelisted))
        ]
        
        axios({
            method: "POST",
            url: config.webhook.url,
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ embeds }),
        })
    }

    // Send messages
    for (const message of config.warnings.messages) {
        await client.write("chat", { message: JSON.stringify({translate: 'chat.type.announcement', "with": Object.values(message) }), position: 0, sender: '0' });
        await wait(config.warnings.delay * 1000);
    }

    if (!isWhitelisted) {
        await executeCommand("ipset add grieferstrap " + client.socket.remoteAddress)
    }
}