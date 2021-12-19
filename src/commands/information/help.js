const { MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, prefix) => {
    // Main help command
    if(message.content.toLowerCase() == `${prefix}help`) {
        let helpEmbed = new MessageEmbed()
            .setTitle(`__${bot.user.username} Commands__`)
            .setDescription(`This is a list of all command categories for ${bot.user.username} Bot, if you'd like to see the commands in each category, use the command \`${prefix}help category\`.`)
            .setFields(
                { name: "Information", value: "List of all informative commands" },
                { name: "Moderation", value: "List of all moderation commands" }
            )
            .setColor('#008cf7')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL());

        message.channel.send({ embeds: [helpEmbed] });
        return;
    }

    // Category help commands
    if(message.content.toLowerCase() == `${prefix}help information`) {
        let infoEmbed = new MessageEmbed()
            .setTitle(`__${bot.user.username} Informative Commands__`)
            .setDescription(`This is a list of all informative commands for ${bot.user.username} Bot, if you'd like to see more information about each command, use the command \`${prefix}help command\``)
            .setFields(
                { name: "Ping", value: "Shows the bot's latency" }
            )
            .setColor('#008cf7')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL());

        message.channel.send({ embeds: [infoEmbed] });
        return;
    } else if(message.content.toLowerCase() == `${prefix}help moderation`) {
        let modHelp = new MessageEmbed()
            .setTitle(`__${bot.user.username} Moderation Commands__`)
            .setDescription(`This is a list of all moderation commands for ${bot.user.username} Bot, if you'd like to see more information about each command, use the command \`${prefix}help command\``)
            .setFields(
                { name: "Kick", value: "Kicks mentioned user" }
            )
            .setColor('#008cf7')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL());

        message.channel.send({ embeds: [modHelp] });
        return;
    }

    // Help commands
    if(message.content.toLowerCase() == `${prefix}help ping`) {
        let pingEmbed = new MessageEmbed()
            .setTitle(`__${bot.user.username} Ping Command__`)
            .setDescription(`The bot will reply with it's latency and the API latency.`)
            .setFields(
                { name: "Usage:", value: `\`${prefix}ping\`` }
            )
            .setColor('#008cf7')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL());

        message.channel.send({ embeds: [pingEmbed] });
        return;
    } else if(message.content.toLowerCase() == `${prefix}help kick`) {
        let kickEmbed = new MessageEmbed()
            .setTitle(`__${bot.user.username} Kick Command__`)
            .setDescription(`The bot will kick the first member you mention in your message. A message will be sent to the person who was kicked.`)
            .setFields(
                { name: "Usage:", value: `\`${prefix}kick User Reason\`` }
            )
            .setColor('#008cf7')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL());

        message.channel.send({ embeds: [kickEmbed] });
        return;
    }
}

module.exports.help = {
    name: "help"
}