const { Permissions } = require('discord.js');
const bot = require('../../../bot').bot;

module.exports.run = async(bot, message, prefix) => {
    if(message.content.toLowerCase() == `${prefix}purge`) {
        message.channel.send(':x: Not enough arguments.');
        return;
    }

    let messageAmount = parseInt(message.content.split(" ").slice(1).join());
    let botMember = bot.guilds.cache.get(message.guild.id).members.cache.get(bot.user.id);

    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        message.channel.send(':x: You do not have the permissions to use this command.');
        return;
    } else if(!botMember.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        message.channel.send(':x: I do not have permission to delete messages.');
        return;
    } else if(messageAmount >= 100 || messageAmount <= 0) {
        message.channel.send(':x: You must select a number between 1 - 99');
        return;
    }

    message.channel.bulkDelete(messageAmount + 1);

    message.channel.send(`:white_check_mark: Successfully deleted ${messageAmount} messages.`).then(msg => {
        setTimeout(() => {
            msg.delete();
        }, 3000);
    });
    return;
}

module.exports.help = {
    name: "purge"
}