const { readdirSync } = require('fs');
const { error, log } = require('../logs');

module.exports = (server) => {
    for (const file of readdirSync('./listeners/')) { 
        if (file.endsWith(".js")) {
            let fileName = file.substring(0, file.length - 3); 
            let fileContents = require(`../listeners/${file}`); 
            try {
              server.on(fileName, fileContents.bind(null, server));
              log("Loaded listener: server." + fileName);
            } catch(e) {
              error(`An error has ocurred on this listener: ${fileName}. Please report this stacktrace on a GitHub issue:`)
              console.error(e);
            }
        }
    };
};