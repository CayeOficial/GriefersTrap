const { exec } = require('node:child_process');
const { error } = require('../logs');

async function executeCommand(command) {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            error("An error has occurred while running a shell command. Did you ran the application with sudo? Stacktrace:")
            console.error(err)
        }

        if (process.argv.some(flag => flag === "--debug")) console.log(stdout, stderr)
    })
}

module.exports = {
    executeCommand
}