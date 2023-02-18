const { log } = require("../logs");

module.exports = async (server, client) => {
    log(`Server started and listening on ${server.options.host}:${server.options.port} using ${server.options.version} version.`)
}