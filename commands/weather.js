const Discord = require('discord.js');
const https = require('https');
var fs = require('fs');
var data;
const location = ["55096_PC","22889"];
const locationnames=["Campsie","City"];
var z;

//const attachment2 = new Discord.Attachment('media/babyshark.mp3');
var weatherdata = [];
                var weathertime=[];
                const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
                

function writeJson(){
    try{
        https.get(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${location[z]}?apikey=RPUiB7zAThqj4ADaFPypIT0YFASpj3zI&details=true&metric=true`, (res) => {
                const {statusCode}  = res;
                const contentType = res.headers['content-type'];
                console.log(statusCode);
                let error;
                if (statusCode !== 200) {
                  error = new Error('Request Failed.\n' +
                                    `Status Code: ${statusCode}`);
                                    data=JSON.parse(fs.readFileSync(`weather${locationnames[z]}.json`,'utf8'));                  
                } else if (!/^application\/json/.test(contentType)) {
                  error = new Error('Invalid content-type.\n' +
                                    `Expected application/json but received ${contentType}`);
                }
                if (error) {
                  console.error(error.message);
                  // consume response data to free up memory
                  res.resume();
                  return;
                }else{
      
                    res.setEncoding('utf8');
                    let rawData = '';
                    res.on('data', (chunk) => { rawData += chunk; });
                    res.on('end', () => {
                    try { 
                        data = JSON.parse(rawData);
                        fs.writeFile(`weather${locationnames[z]}.json`, rawData, 'utf8',function(err){
                            if(err){
                                console.log(err);
                            }
                        console.log(`write to weather${locationnames[z]}.json success`)
                       
                        }) ;
    
                    } catch (e) {
                        console.error(e.message);
                    }
                    });
                } 
            }).on('error', (e) => {
                console.error(`Got error: ${e.message}`);
            })
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log("one");
                    resolve();
                  }, 2000);

              });
    }catch(e){
            console.log(e.message);
        }
}

function processJson(windy,channel){
    try{
        var datetime=new Date(data[0].EpochDateTime*1000);
        var date = datetime.getDate() +" "+ monthNames[datetime.getMonth()];
        
        channel.send(`OMFG INCOMING WEATHER REPORT for ${locationnames[z]} :musical_note: DOO DOO DOOOOO :musical_note: ` ).then(x=>{
            for(i=0;i<12;i++){
                
                var time=new Date(data[i].EpochDateTime*1000);
                var hours = time.getHours();
                
                var apm ="am";
                if(hours>11){
                    apm="pm";
                }
                if(hours>12){
                    hours=hours-12;
                }

                weathertime[i]=hours+apm;
                 if(data[i].RainProbability>50){
                    weatherdata[i]="Rainy :umbrella2: ";
                }else if(data[i].Wind.Speed.Value>=24){
                    weatherdata[i]="Windy"+windy;
		}else if(data[i].IconPhrase=="Cloudy"){
                    weatherdata[i]="Cloudy :cloud:";
                }else if(data[i].IconPhrase=="Partly sunny"||data[i].IconPhrase=="Intermittent clouds"){
                    weatherdata[i]="Partly Cloudy :white_sun_small_cloud: ";
                }else{
                    
                    if(data[i].IsDaylight==true){
                    weatherdata[i]="Sunny :sun_with_face: ";
                    }else{
                        weatherdata[i]="Clear :sun_with_face: ";
                    }
                }
            }
            
            const embed = new Discord.RichEmbed()
                .setTitle("Weather for "+date)
                .setColor(0x00AE86)
                .setDescription(`12 hr Weather Data for **${locationnames[z]}** - sourced from Accuweather,not entirely accurate, blame @PlayDis`)
                .addField(weathertime[0], weatherdata[0], true)
                .addField(weathertime[1], weatherdata[1], true)
                .addField(weathertime[2], weatherdata[2], true)
                .addField(weathertime[3], weatherdata[3], true)
                .addField(weathertime[4], weatherdata[4], true)
                .addField(weathertime[5], weatherdata[5], true)
                .addField(weathertime[6], weatherdata[6], true)
                .addField(weathertime[7], weatherdata[7], true)
                .addField(weathertime[8], weatherdata[8], true)
                .addField(weathertime[9], weatherdata[9], true)
                .addField(weathertime[10], weatherdata[10], true)
                .addField(weathertime[11], weatherdata[11], true);
            
        channel.send({embed});
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("two");
                resolve();
              }, 2000);

          });
        });
    }catch(e){
        console.log(e.message);
    } 
}
                
exports.run = async(client,message, args) => {
    if(message.author.id != message.guild.ownerID){return;}
    let place = args[0];
    

    const windy = client.emojis.find('name', "windy");
    var channel = client.channels.get('493980099968892928');
    if(place=="city"){
        z=1;
        channel = client.channels.get('517148079141683203');
        
    }else{
        z=0;
    }
    console.log(`Working out this weather shit for ${locationnames[z]}`);
        //22889
        //55096_PC
        await writeJson();

        await processJson(windy,channel);
            
        

}
