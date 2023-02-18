const { log } = require("../logs");

module.exports = async (server, client) => {
    log(`The server has received a ping from this IP Address: ${client.socket.remoteAddress}`)
}