const { Permissions, MessageEmbed } = require('discord.js');
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://database.db');

module.exports.run = async(bot, message, prefix) => {
    if(message.content.toLowerCase() == `${prefix}kick`) {
        message.channel.send(':x: Not enough arguments.');
        return;
    }

    let kickedUser = message.mentions.members.first();
    let kickReason = message.content.split(" ").slice(2).join(" ") || "N/A";
    let modlogsChannelId = await keyv.get('mod-logs-channel'+message.guild.id);
    let modlogsChannel = bot.channels.cache.get(modlogsChannelId);

    if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
        message.channel.send(':x: You do not have permission to use this command.');
        return;
    } else if(kickedUser == undefined) {
        message.channel.send(':x: That user is not in the server.');
        return;
    } else if(kickedUser.roles.highest >= message.member.roles.highest) {
        message.channel.send(':x: You cannot kick this user.');
        return;
    } else if(!kickedUser.kickable) {
        message.channel.send(':x: I do not have permission to kick this user.');
        return;
    }
    
    let kickEmbed = new MessageEmbed()
        .setTitle(`You have been kicked from ${message.guild.name}`)
        .setDescription(`You have been kicked from the ${message.guild.name} server by ${message.author.username}.`)
        .setFields(
            { name: "Reason:", value: kickReason }
        )
        .setColor('#ba200b')
        .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL())
        .setTimestamp();

    await kickedUser.user.send({ embeds: [kickEmbed] });

    kickedUser.kick(kickReason);

    if(modlogsChannel !== undefined) {
        let kickModlogEmbed = new MessageEmbed()
            .setTitle(`Kicked ${kickedUser.user.username}`)
            .setDescription(`${kickedUser.user.username} has been kicked from the server.`)
            .setFields(
                { name: "Reason:", value: kickReason },
                { name: "Kicked by:", value: message.author.username }
            )
            .setAuthor(kickedUser.user.displayAvatarURL())
            .setColor('#ba200b')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL())
            .setTimestamp();

        modlogsChannel.send({ embeds: [kickModlogEmbed] });
    }

    message.channel.send(`:white_check_mark: ${kickedUser.username} has been kicked.`);
    return;
}

module.exports.help = {
    name: "kick"
}