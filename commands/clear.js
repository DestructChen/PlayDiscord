const fs = require("fs");
const Discord = require('discord.js');
exports.run = async(client, message,args  ) => {
    if(message.author.id == message.guild.ownerID){
        if (message.channel.type == 'text') {
            message.channel.fetchMessages({limit:10})
            .then(messages => {
                message.channel.bulkDelete(messages);
                messagesDeleted = messages.array().length; // number of messages deleted

                // Logging the number of messages deleted on both the channel and console.
                message.channel.send("Deletion of messages successful. Total messages deleted: "+messagesDeleted);
                console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
            })
            .catch(err => {
                console.log('Error while doing Bulk Delete');
                console.log(err);
            });
        }
    }else{
        message.channel.send("you are not the owner so fuck off")
    }
}