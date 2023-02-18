const { readFileSync } = require('fs');
const { load } = require('js-yaml');
const { log, error } = require('./logs');
const config = load(readFileSync("./config.yml"))
const protocol = require('minecraft-protocol');
const server = protocol.createServer(config.server);

// We need to export config before loading any more code to avoid circular dependencies error.
module.exports = {
    config
}

try {
    log("Loading handlers...");
    require("./handlers/events")(server);
    require("./handlers/ipset");
    log("Successfully loaded all handlers!")
} catch (e) {
    error("There was an error while loading handlers. Please report this stacktrace on a Github issue:")
    console.error(e)
}
