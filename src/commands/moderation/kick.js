const { Permissions, MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, prefix) => {
    if(message.content.toLowerCase() == `${prefix}kick`) {
        message.channel.send(':x: Not enough arguments.');
        return;
    }

    let kickedUser = message.mentions.members.first();
    let kickReason = message.content.split(" ").slice(2).join(" ");

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

    if(kickReason == undefined) {
        let kickEmbed = new MessageEmbed()
            .setTitle(`You have been kicked from ${message.guild.name}`)
            .setDescription(`You have been kicked from the ${message.guild.name} server by ${message.author.username}.`)
            .setFields(
                { name: "Reason:", value: "N/A" }
            )
            .setColor('#ba200b')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL())
            .setTimestamp();

        await kickedUser.user.send({ embeds: [kickEmbed] });

        kickedUser.kick();
    } else {
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
    }

    message.channel.send(`:white_check_mark: ${kickedUser.username} has been kicked.`);
    return;
}

module.exports.help = {
    name: "kick"
}