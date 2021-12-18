const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [ Intents.FLAGS.GUILDS, "GUILD_MESSAGES", "GUILD_MEMBERS" ] });
const { token, prefix } = require('./config.json');
const fs = require('fs');

bot.commands = new Collection();
bot.events = new Collection();

// Command Handler
fs.readdirSync('./src/commands').forEach(dir => {
    fs.readdir(`./src/commands/${dir}`, (err, files) => {
        if(err) throw err;

        let jsFiles = files.filter(f => f.split(".").pop() == "js");

        if(jsFiles.length <= 0) return console.log("[COMMAND HANDLER]: Can't find any commands.");

        jsFiles.forEach(file => {
            let fileGet = require(`./src/commands/${dir}/${file}`);

            console.log(`[COMMAND HANDLER]: File ${file} was loaded.`);

            try {
                bot.commands.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});

// Event Handler
fs.readdirSync('./src/events/').forEach(file => {
    let jsFiles = fs.readdirSync('./src/events/').filter(f => f.split(".").pop() == "js");
    if(jsFiles.length <= 0) return console.log("[EVENT HANDLER]: Can't find any events.");

    jsFiles.forEach(file => {
        let eventGet = require(`./src/events/${file}`);

        try {
            bot.events.set(eventGet.name, eventGet);
        } catch(err) {
            return console.log(err);
        }
    });
});

bot.on('ready', () => {
    console.log(`${bot.user.username} is now online!`);
});

bot.on('messageCreate', message => {
    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    let commands = bot.commands.get(cmd.slice(prefix.length));

    if(commands) {
        if(!message.content.startsWith(prefix)) return;

        commands.run(bot, message, prefix);
    }
});

bot.login(token);