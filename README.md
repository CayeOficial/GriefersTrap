# 🔒 - GriefersTrap

Creates a fake minecraft server and blocks IP addresses from users that joins in using Node.JS.

Has your server ever been griefed or are you afraid of it? Well, with this simple, secure, performant and efficient tool you can troll people that is doing a port-scanning to your server IP.

❗ This is not a security-related app (not at all) and shouldn't be used to prevent griefs.
🖥 **Support:** zCayeOficial#0001

### ❓ - How it works?

The app will generate a fake-n-empty server with full access to the Minecraft protocol, and when a player joins, it will send him some messages and then add his IP Address to a ipset set and will be blocked from accessing any port on the server.

### 📸 - Demo

[![Demo](https://img.youtube.com/vi/b-CgRFdxeus/0.jpg)](https://www.youtube.com/watch?v=b-CgRFdxeus)
[![Demo](https://images-ext-2.discordapp.net/external/XMSVZqVHaFV3kwlYNyACpz-Pkljvldzj9rkhqYIofZk/https/cdn.cayeoficial.com/image/Discord_CXekF8LOhd.png)]

# 🔨 - Requirements
- A dedicated server or VPS with root access
- Node.J v17 or higher
- ipset and iptables installed on the system

# 🛠 - Installation
### (This guide is written assuming Ubuntu 20.04 as base OS, but also works with Debian 10/11 and Ubuntu 22.04)
1. Install Node.JS if you haven't done it yet. The following commands will install Node.JS v18 on your machine. (Recommended)
```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs
```
2. Install ipset if you haven't done it yet.
```bash
apt install -y ipset
```
3. Create a folder for the app and clone the repo.
```bash
git clone https://github.com/CayeOficial/GriefersTrap
```
4. Install the app dependencies.
```bash
npm install
```
5. Edit `config.yml` to your liking and run the app using `node index.js`, if you want to see the output of the executed commands by the app, add the flag `--debug` at the end of the startup command.

💡 **TIP:** If you want your app to restart if it crashes, you can use PM2 (Process Manager 2) for that.
```bash
npm i -g pm2
pm2 start index.js
pm2 save
pm2 startup
```
Another useful PM2 commands:
```bash
pm2 status
pm2 restart/stop/kill ID/NAME
pm2 monit
pm2 logs
```
_(( ID/NAME can be seen on pm2 status ))_

**More info:** https://pm2.keymetrics.io/

# 👨‍💻 - Troubleshooting | Common issues

If you application doesn't block connections, check the following steps:
- Is your IP whitelisted? If so, remove it from the config and restart the app.
- Did the app created the set? Try running `ipset list` and search for a set called "grieferstrap", if it doesn't exists, try the following steps.
- Is ipset/iptables installed and/or enabled? Run `ipset` and `iptables`, if some (or both) of them returns "command not found" you should turn arround and re-read the installation guide.
- Did the app throw any error? Try adding the `--debug` flag at the end of the startup command to check for errors.
- The app will try to setup iptables/ipset once, to make a fresh setup, scroll down to the "Removing restrictions" category of this page and delete the `.ipset` file.

# 🔐 - Removing restrictions

If you want to whitelist an IP from being blocked, you can do it on the config. But if you want to remove the restriction of an already blocked IP you can do so by manually editing the set. This app offers no way to do it internally.

```bash
ipset del grieferstrap IP_ADDRESS
```
Replace IP_ADDRESS with the ip you want to unlock.

---
If you want to undo all the firewall rules that the app added, you should run the following commands:
```bash
iptables -D INPUT -m set --match-set grieferstrap src -j DROP
iptables -D FORWARD -m set --match-set grieferstrap src -j DROP
ipset destroy grieferstrap
```
