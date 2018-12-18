const fs = require("fs");
const Discord = require('discord.js');
exports.run = async(client, message,args  ) => {
    if(message.author.id == message.guild.ownerID){
        let channel = message.mentions.roles.first()
        
        config.defaultRole = channel;
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        const embed = new Discord.RichEmbed()
        .setTitle("Default role set to :")
        .setDescription(config.defaultRole)
        .setColor("AQUA");
        message.channel.send({embed});
    }
}