module.exports.run = async(bot, message, prefix) => {
    if(message.content.toLowerCase() !== `${prefix}ping`) return;

    message.channel.send('Pinging...').then(async msg => {
        let botLatency = msg.createdTimestamp - message.createdTimestamp;
        let APILatency = bot.ws.ping;

        msg.edit(`Pong!\nBot Latency: ${botLatency}\nAPI Latency: ${APILatency}`);
        return;
    });
}

module.exports.help = {
    name: "ping"
}