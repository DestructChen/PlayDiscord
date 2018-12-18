const fs = require("fs");


var method;

const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;                                                                                                                                                           

exports.run =async (client, message   ) => {
        if(message.guild.ownerID==message.author.id){
            const yz = message.channel;
                const x= message.guild.roles.find('name',config.defaultRole.name);
                const embed = new Discord.RichEmbed()
                .setColor(config.colour)
                .setTitle("Prof. PlayDis Configuration")
                .setDescription("Type an option")
                .addField("welcomeDM",config.welcomeDM)
                .addField("prefix",config.prefix)
                .addField("defaultRole",x);
                yz.send({embed});
           // DM.send("Welcome to the configurator");

            const collector = new Discord.MessageCollector(yz,m => m.author.id==message.guild.ownerID, {max:1, time: 60000 });
            
            collector.on('collect', message => {
                if (message.content == "welcomeDM") {
                    yz.send("You Want To See Someones Spec OK!");
                } else if (message.content == "prefix") {
                    yz.send("The current prefix is "+config.prefix+"\nWhat would you like to change it to?\nPossible options "+format);
                    collector.stop;
                    
                    /*.then(msg=>{msg.react('❎')
                    const filter = (reaction,user)=>{
                        return ['❎'].includes(reaction.emoji.name)&&user.id==message.guild.ownerID;
                    }

                    msg.awaitReactions(filter,{max:1,time:10000,errors:['time']}).then(collected=>{
                        const reaction = collected.first();
                        if(reaction.emoji.name='❎'){
                            msg.reply("Cancelled");
                        }
                    })
                });*/
                
                const prefix = new Discord.MessageCollector(yz,m =>m.author.id==message.guild.ownerID, { max:1,time: 10000 });
                prefix.on('collect',prefixmsg=>{
                    if(prefixmsg.content.length==1){
                        if(format.test(prefixmsg.content)){
                            
                            config.prefix = prefixmsg.content;
                            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                            yz.send(prefixmsg.content+" is now the new prefix");
                            
                        }else{
                            yz.send("error "+prefixmsg.content);
                        }
                    }else{
                        yz.send("one character please");
                    }
                })
                }else if (message.content=="defaultRole"){
                    let x="none";
                    if(config.defaultRole!=null){
                        x=config.defaultRole.name;
                    }
                    yz.send("The current defaultRole is "+x+"\nWhat would you like to change it to?");
                    collector.stop;
                    const collector1 = new Discord.MessageCollector(yz,m =>m.author.id==message.guild.ownerID, {max:1, time: 10000 });
                    collector1.on('collect',defaultRoleMsg=>{
                        if(defaultRoleMsg.mentions.roles.first( )!=null){
                            let role = defaultRoleMsg.mentions.roles.first() 
                            config.defaultRole = role;
                            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
                            yz.send(config.defaultRole+" is now the new default Role");
                        }else{
                            yz.send("error no role found");
                        }
                    })




                }
        })
        
        
           
        
    
        }
    
}