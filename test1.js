global.config = require('./config.json');
global.Discord = require('discord.js');
global.schedule = require('node-schedule');
global.strings = require("./strings.json");
global.fs=require('fs');

global.poifinder = require("./poifind.js");
poifinder.load(config.poifile);


const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./project.sqlite');


const fs = require("fs");
global.sheet1 = "";

var attachment1 = new Discord.Attachment('media/babyshark.gif');
var attachment2 = new Discord.Attachment('media/babyshark.mp3');
var attachment3 = new Discord.Attachment('media/tyranitar.gif');
var attachment4 = new Discord.Attachment('media/tyranitar.mp3');
const talkedRecently = new Set();

var creds = require('./MyProject.json');
var GoogleSpreadsheet = require('google-spreadsheet');

var doc = new GoogleSpreadsheet(config.spreadsheetID);

client.on('error',(error)=>{
  console.log(error.message); 
  setTimeout(()=>{client.emit('reconnecting');
  client.login(config.token);},30000);
  
})

client.on('ready', () => {
  client.user.setActivity('Pokemon Go', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);
  // Check if the table "points" exists.
  const table1 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'tradedb';").get();
  const table2 = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'frienddb';").get();


  if (!table1['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE tradedb (id TEXT PRIMARY KEY, user TEXT, guild TEXT, pokemon TEXT, img TEXT);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON tradedb (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  if (!table2['count(*)']) {
    sql.prepare("CREATE TABLE frienddb ( user PRIMARY KEY, guild TEXT,trainercode TEXT, date_modiwed DATETIME, discordname TEXT, trainername TEXT);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON frienddb (user);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // Ensure that the "id" row is always unique and indexed.



  // And then we have two prepared statements to get and set the score data.
  client.getData = sql.prepare("SELECT * FROM tradedb WHERE id = ? AND guild = ?");
  client.getInfo = sql.prepare("SELECT pokemon FROM tradedb WHERE user = ? AND guild = ?");
  client.setListing = sql.prepare("INSERT OR REPLACE INTO tradedb (id, user, guild, pokemon ) VALUES (@id, @user, @guild, @pokemon);");
  client.setListingImage = sql.prepare("INSERT OR REPLACE INTO tradedb (id, user, guild, pokemon,img ) VALUES (@id, @user, @guild, @pokemon, @img);");
  client.searchDB = sql.prepare("SELECT * FROM tradedb where id");
  client.setTrainerCode = sql.prepare("INSERT OR REPLACE INTO frienddb(date_modified,user,guild,trainercode,trainername,discordname) VALUES(@date_modified,@user, @guild, @trainercode,@trainername,@discordname);");
  client.getTrainerCodes = sql.prepare("SELECT date_modified,trainername, discordname,trainercode FROM frienddb");
  console.log('Ready!');

  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function (err, info) {
      sheet1 = info.worksheets[0];
      //console.log(sheet1);
      sheet1.setTitle("hello");
      //console.log("a");
    });

  });
});

//Auto weather
function x(){
  var t = require('./commands/weather.js');
  t.run(client,"campsie");
}

function hh(){
  var t = require('./commands/weather.js');
  t.run(client,"city");
}

var j = schedule.scheduleJob('0 0 7,19 * * *', x);
var h = schedule.scheduleJob('30 0 7,19 * * *', hh);

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  var msg = config.welcomeDM.replace("{user}",member).replace("{server}",member.guild.name);
  console.log(msg);
  member.send(msg);
member.addRole(config.defaultRole.id);
});

client.login(config.token);

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)){ return;
  }else{
    if (talkedRecently.has(message.author.id)) {
      message.channel.send("Commands too fast - " + message.author);
    } else {
  
  const args = message.content.slice(config.prefix.length).split(/ +/g);
  const command = args.shift().toLowerCase();

    if (message.guild) {
      try {
        if(command=="discord"){
          message.channel.send("https://discord.gg/XMJJJmm");
          
        }else if (command=="babyshark"){

          message.channel.send("",attachment1).then(ok=>{message.channel.send("",attachment2)});
        
        }else if (command=="tyranitar"){
          client.emit("guildMemberAdd", message.member);
          message.channel.send("",attachment3).then(ok=>{message.channel.send("",attachment4)});
        
        }else if(command=="help"){
          var commandFile = require(`./commands/${args[0]}.js`);
          commandFile.help(message);
        }
        else if (/^[a-zA-Z]+$/.test(command)) {
          var commandFile = require(`./commands/${command}.js`);
          commandFile.run(client, message, args);
        }
      } catch (err) {
        console.error(err);
      }

      
    }else if(command=="map"){
      require('./commands/map.js').run(client,message,args);
    }

    // the user can type the command ... your command code goes here :)

    // Adds the user to the set so that they can't talk for a minute
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 5000);
  }
}
});

