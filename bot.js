const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [ Intents.FLAGS.GUILDS, "GUILD_MESSAGES", "GUILD_MEMBERS" ] });
const { token, prefix } = require('./config.json');
const fs = require('fs');

bot.commands = new Collection();

fs.readdirSync('./src/commands').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if(err) throw err;

        let jsFiles = files.filter(f => f.split(".").pop() == "js");

        if(jsFiles.length <= 0) return console.log("[COMMAND HANDLER]: Can't find any commands.");

        jsFiles.forEach(file => {
            let fileGet = require(`./commands/${dir}/${file}`);

            console.log(`[COMMAND HANDLER]: File ${file} was loaded.`);

            try {
                bot.commands.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

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