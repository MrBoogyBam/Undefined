const { MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, prefix) => {
    // Main help command
    if(message.content.toLowerCase() == `${prefix}help`) {
        let helpEmbed = new MessageEmbed()
            .setTitle(`__${bot.user.username} Commands__`)
            .setDescription(`This is a list of all command categories for ${bot.user.username} bot, if you'd like to see the commands in each category, use the command \`${prefix}help category\`.`)
            .setFields(
                { name: "Information", value: "List of all informative commands" }
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
            .setDescription(`This is a list of all informative commands for ${bot.user.username} bot, if you'd like to see more information about each command, use the command \`${prefix}help command\``)
            .setFields(
                { name: "ping", value: "Shows the bot's latency" }
            )
            .setColor('#008cf7')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL());

        message.channel.send({ embeds: [infoEmbed] });
        return;
    }

    // Help commands
    if(message.content.toLowerCase() == `${prefix}help ping`) {
        let pingEmbed = new MessageEmbed()
            .setTitle(`__${bot.user.username} Ping Command__`)
            .setDescription(`The bot will reply with it's latency and the API latency.`)
            .setFields(
                { name: "Usage:", value: `${prefix}ping` }
            )
            .setColor('#008cf7')
            .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL());

        message.channel.send({ embeds: [pingEmbed] });
        return;
    }
}

module.exports.help = {
    name: "help"
}