const fs = require("fs");
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if (message.author.id == message.guild.ownerID) {
        let text = message.content.substr(message.content.indexOf(" ") +1);
        config.welcomeDM = text;

        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        
       
    }
}