/**Pokemon Go Team role assignment
 * applicable teams : 
 *  mystic
 *  valor
 *  instinct
 * 
 * retrieves existing roles in a collection(extends Map)
 * removes exisiting team roles
 * roles to array
 * array push selected team
 * 
 * */

const errormsg = "Not a valid team";
//global.config = require('../config.json');
exports.run = (client, message, args   ) => {
    try{

        let team = args[0].toLowerCase();
        let teams = ["mystic","valor","instinct"];
        let mystic = message.guild.roles.find("name", "mystic").id;
        let valor = message.guild.roles.find("name", "valor").id;
        let instinct = message.guild.roles.find("name", "instinct").id;
        let valorEmoji = client.emojis.get("427715212964134913");
        let instinctEmoji = client.emojis.get("427715155497975808");
        let mysticEmoji = client.emojis.get("427715172568793089");
        let currentTeam;
        if(teams.includes(team)){
            let x = message.member.roles;
            if(x.has(mystic)){
                x.delete(mystic)
            }
            if(x.has(valor)){
                x.delete(valor)
            }
            if(x.has(instinct)){
                x.delete(instinct)
            }
            let y=x.array();
                if(team=="mystic"){
                    y.push(mystic);
                    currentTeam=mysticEmoji;
                }else if(team == "valor"){
                    y.push(valor);
                    currentTeam=valorEmoji;
                }else{
                    y.push(instinct);
                    currentTeam=instinctEmoji;
                        
                }
                message.member.setRoles(y);            
        
            message.channel.send("Success! Added " + message.member + " to Team "+ team.charAt(0).toUpperCase()+team.slice(1)+currentTeam);
        }else{
                //message.channel.send(errormsg);
        }
        
    
    }catch(err){
        console.log(err);
    }
}

exports.help =  (message) => {
    const embed = new Discord.RichEmbed()
    .setTitle(config.prefix+"team <teamname>")
    .setDescription("valid teams : Mystic Instinct Valor")
    .setColor(config.colour);
    message.channel.send({embed});
}