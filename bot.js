const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [ Intents.FLAGS.GUILDS, "GUILD_MESSAGES", "GUILD_MEMBERS" ] });
const { token, prefix } = require('./config.json');
const fs = require('fs');

bot.on('ready', () => {
    console.log(`${bot.user.username} is now online!`);
});

bot.on('messageCreate', message => {
    if(message.author.bot) return;

    if(message.content.toLowerCase() == `${prefix}test`) {
        message.channel.send(":white_check_mark: It works!");
        return;
    }
});

bot.login(token);