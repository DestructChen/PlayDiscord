global.config = require('../config.json');

exports.run = (client, message   ) => {
    const embed = new Discord.RichEmbed()
    .setTitle("**Commands**")
    .setDescription("Current prefix is "+config.prefix)
    .setColor(config.colour)
    .addField("commands","everything u see here i.e. a list of commands",true)
    .addField("help <command>", "displays more information about <command>",true)
    .addField("team <name>", "assign a team role. please use in #427715743493128192      Mystic/Valor/Instinct",true)
    .addField("membercount","displays number of members in different teams",true)
    .addField("map","displays map info to pokestop/gym",true)
    .addField("weather","displays 12hr weather prediction in weather channel",true)
    .addField("poll \"question\" \"options\"", "up to 4 options, use quotes for longer options, will display reaction")
    .setThumbnail(message.guild.iconURL);
    
    
    if(message.guild.ownerID == message.author.id){
        
        embed
        .setDescription("Current prefix is " +config.prefix+"\nUnderlined commands are Server Owner only")
        .addField("__prefix <symbol>__","changes prefix for commands",true )
        .addField("__defaultRole <#role>__","assign a default role when someone joins")
        .addField("__welcomeDM <message>__","sends a Direct Message to users when they join the server. \n{server} represents Server Name\n{user} represents the new user\n u can also tag other users and channels, ")
        .addField("__clear__","clears previous 10 messages");
        
        
    }
    message.channel.send({embed});
}

exports.help =  (message) => {
    const embed = new Discord.RichEmbed()
    .setTitle(config.prefix+"commands")
    .setDescription("Displays command list.")
    .setColor(config.colour);
    message.channel.send({embed});
}