const bot = require('../../bot').bot;

bot.on('ready', () => {
    console.log(`${bot.user.username} is now online!`);
});