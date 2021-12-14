const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [ Intents.FLAGS.GUILDS, "GUILD_MESSAGES", "GUILD_MEMBERS" ] });
const { token, prefix } = require('./config.json');

bot.on('ready', () => {
    console.log(`${bot.user.username} is now online!`);
});

bot.login(token);