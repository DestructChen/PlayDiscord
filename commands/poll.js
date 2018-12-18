//const emojis = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'];
//const emojis = [":one:",":two:",":three:",":four:",":five:"];
const emojis = ["\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3"];

exports.run = (client, message, args) => {
    
    //split message by quotation marks
    let b = message.content.match(/\\?.|^$/g).reduce((p, c) => {
        if(c === '"'){
            p.quote ^= 1;
        }else if(!p.quote && c === ' '){
            p.a.push('');
        }else{
            p.a[p.a.length-1] += c.replace(/\\(.)/,"$1");
        }
        return  p;
    }, {a: ['']}).a
    //b=[map, question, options, options, options, options, options]
    //max five options
    if(b.length>7){
        message.channel.send("Too many options");
        return;
    }

    //add to embed
    const embed = new Discord.RichEmbed()
    .setTitle(b[1])
    for(i=2;i<b.length;i++){
        embed
        .addField(emojis[i-2]+" "+b[i],"--------");
    }
    
    ///add reactions to embed
    message.channel.send({embed}).then(async (message)=>{
        for(i=0;i<b.length-2;i++){
            await message.react(emojis[i]);
        }

    });
    
    
        
    
    

    
}