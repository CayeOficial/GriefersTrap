// This file sets up ipset on the server.
const { existsSync, writeFileSync } = require('fs');
const { log, error } = require('../logs');
const { executeCommand } = require('./utils');

(async () => {
    // Check if ipset has been already set up
    if (existsSync(".ipset")) return;

    try {
        // Create set and deny connections that match it
        // We don't automatically install ipset because we suppose that the end user have read the full installation guide and installed it before, also for compatibility reasons
        await executeCommand("ipset create grieferstrap hash:ip")
        await executeCommand("iptables -I INPUT -m set --match-set grieferstrap src -j DROP")
        await executeCommand("iptables -I FORWARD -m set --match-set grieferstrap src -j DROP")

        // Create .ipset file so ipset is not set up again on next restart
        writeFileSync(".ipset", "This file just tells the script that ipset has been already set up, if for some reason you want to make the script re-run the ipset setup process, delete this file and restart the script.")

        log(`ipset has been set up successfully and it's ready to deny connections.\n
        We suggest you to check that everything is alright, please run 'ipset list' on your terminal, if any set matches 'grieferstrap' name, delete the '.ipset' file and re-run this app.\n
        Either if ipset is not installed, please turn arround and check the installation wiki.`)
    } catch(e) {
        error("There was an error while setting up ipset. Is it installed? Stacktrace:");
        console.error(e);
    }
})();