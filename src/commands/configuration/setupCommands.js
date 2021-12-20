const Keyv = require('keyv');
const keyv = new Keyv("sqlite://database.db");

module.exports.run = async(bot, message, prefix) => {
    if(message.content.toLowerCase().startsWith(`${prefix}setup modlog`)) {
        if(message.content.toLowerCase() == `${prefix}setup modlog`) {
            message.channel.send(":x: Not enough arguments.");
            return;
        }
    
        let channelIdArgs = message.content.split(" ").slice(2).join();
        let channelId = channelIdArgs.substring(2, channelIdArgs.length - 1);
        let modlogsChannel = bot.channels.cache.get(channelId);

        await keyv.set('mod-logs-channel'+message.guild.id, modlogsChannel);

        message.channel.send(`:white_check_mark: Successfully set the moderation logs channel to <#${channelId}>`);
        return;
    }
}

module.exports.help = {
    name: "setup"
}