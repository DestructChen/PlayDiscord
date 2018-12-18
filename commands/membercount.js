exports.run = async(client, message,args  ) => {
    let mysticEmoji = message.client.emojis.get("427715172568793089");
	let instinctEmoji = message.client.emojis.get("427715155497975808");
    let valorEmoji = message.client.emojis.get("427715212964134913");

		let mystic=0;
		let instinct=0;
		let valor=0;
		let bots=0;
		let mystic1 = message.guild.members.filter(member => { 
			return member.roles.find(x=>x.name==="mystic");
		}).map((member) => {
			mystic++;
		})
		let instinct1 = message.guild.members.filter(member => { 
			return member.roles.find(x=>x.name==="instinct");
		}).map(member => {
			instinct++;
		})

		let valor1 = message.guild.members.filter(member => { 
			return member.roles.find(x=>x.name==="valor");
		}).map(member => {
			valor++;
		})
		let bots1 = message.guild.members.filter(member => { 
			return member.roles.find(x=>x.name==="Bots");
		}).map(member => {
			bots++;
		})
		let noteam = message.guild.memberCount-mystic-valor-bots-instinct;
		const embed = new Discord.RichEmbed();
		embed
		.setTitle("Member Count")
		.setColor(config.colour)
		.addField("Mystic "+mysticEmoji,mystic,true)
		.addField("Instinct "+instinctEmoji,instinct,true)
		.addField("Valor "+valorEmoji,valor,true)
		.addField("No set team",noteam,true)
		.addField("Bots :robot:",bots,true)
		.addField("Total",message.guild.memberCount,true);
		
		clientMessage = {embed};
		message.channel.send(clientMessage);


}

exports.help=(message)=>{
    const embed = new Discord.RichEmbed()
    .setTitle(config.prefix+"membercount")
    .setDescription("Displays number of members in each team")
    .setColor(config.colour);
    message.channel.send({embed});
}
