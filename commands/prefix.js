const fs = require("fs");
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if (message.author.id == message.guild.ownerID) {
        if (args[0].match(/[^a-zA-Z0-9\s\@\#]/) && args[0].length == 1) {
            config.prefix = args;
            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

            const embed = new Discord.RichEmbed()
                .setTitle("new prefix")
                .setDescription(config.prefix)
                .setColor(colour);

            message.channel.send({ embed });
        } else {
            message.channel.send("Prefix should be a single symbol character");
        }
    }
}


exports.help =  (message) => {
    const embed = new Discord.RichEmbed()
    .setDescription("Changes prefix for commands. Prefix should be a single character and be a symbol excluding @,#.")
    .setColor(colour);
    message.channel.send({embed});

}