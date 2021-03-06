const Keyv = require('keyv');
const keyv = new Keyv("sqlite://database.db");

module.exports.run = async(bot, message, prefix) => {
    if(message.content.toLowerCase().startsWith(`${prefix}setup modlogs`)) {
        if(message.content.toLowerCase() == `${prefix}setup modlogs`) {
            message.channel.send(":x: Not enough arguments.");
            return;
        }
    
        let channelIdArgs = message.content.split(" ").slice(2).join();
        let modlogsChannel = channelIdArgs.substring(2, channelIdArgs.length - 1);

        await keyv.set('mod-logs-channel'+message.guild.id, modlogsChannel);

        message.channel.send(`:white_check_mark: Successfully set the moderation logs channel to <#${modlogsChannel}>`);
        return;
    }
}

module.exports.help = {
    name: "setup"
}