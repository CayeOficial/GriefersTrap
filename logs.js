const { writeFile } = require("fs");
const colors = require('ansi-colors');

function log(text) {
    var log = `[${new Date().toLocaleString('es-ES')}] - [INFO] ${text}`
    console.log(colors.greenBright.bold(log))
    writeFile('./logs/log.txt', log + "\r\n", { flag: 'a+' }, error => {
        if (error) console.error(error);
    });
};

function warn(warnig) {
    var log = `[${new Date().toLocaleString('es-ES')}] - [WARN] ${warnig}`
    console.log(colors.yellow.bold(log))
    writeFile('./logs/log.txt', log + "\r\n", { flag: 'a+' }, error => {
        if (error) console.error(error);
    }); 
};

function error(err) {
    var log = `[${new Date().toLocaleString('es-ES')}] - [ERROR] ${err}`
    console.log(colors.redBright.bold(log));
    writeFile('./logs/errors.txt', log + "\r\n", { flag: 'a+' }, error => {
        if (error) console.error(error);
    });
};

module.exports = {
    log,
    warn,
    error
};