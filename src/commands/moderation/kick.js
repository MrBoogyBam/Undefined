const { Permissions } = require('discord.js');

module.exports.run = async(bot, message, prefix) => {
    if(message.content.toLowerCase() == `${prefix}kick`) {
        message.channel.send(':x: Not enough arguments.');
        return;
    }

    let kickedUser = message.mentions.members.first();

    if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        message.channel.send(':x: You do not have permission to use this command.');
        return;
    } else if(kickedUser == undefined) {
        message.channel.send(':x: That user is not in the server.');
        return;
    } else if(kickedUser.roles.highest > message.member.roles.highest) {
        message.channel.send(':x: You cannot kick this user.');
        return;
    } else if(!message.member.kickable) {
        message.channel.send(':x: I do not have permission to kick this user.');
        return;
    }

    kickedUser.kick();

    message.channel.send(`:white_check_mark: ${kickedUser.username} has been kicked.`);
    return;
}

module.exports.help = {
    name: "kick"
}