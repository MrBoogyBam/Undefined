const { MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, prefix) => {
    if(message.content.toLowerCase() !== `${prefix}ping`) return;

    let botLatency = Date.now() - message.createdTimestamp;
    let APILatency = bot.ws.ping;

    let pingEmbed = new MessageEmbed()
        .setTitle('Pong!')
        .setFields(
            { name: "Bot Latency:", value: `${botLatency}ms` },
            { name: "API Latency:", value: `${APILatency}ms` }
        )
        .setColor('#3ce61e')
        .setFooter(`${bot.user.username} Bot`, bot.user.displayAvatarURL())
        .setTimestamp();

    message.channel.send({ embeds: [pingEmbed] });
    return;
}

module.exports.help = {
    name: "ping"
}