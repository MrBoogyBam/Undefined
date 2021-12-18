const bot = require('../../bot').bot;
const { prefix } = require('../../config.json');

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