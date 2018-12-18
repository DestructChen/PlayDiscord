

exports.run = (client, message, args) => {
    var discord =  message.author.username + "#" + message.author.discriminator;
    let code = args[0];
    let trainername = args[1];
    if (code.length != 12) {
        message.channel.send("Code should be 12 numbers long. Please remove spaces as well.");
    } else {
        console.log(code);
        var date = new Date().toLocaleString();
        var info = { date_modified: date, user: message.author.id, guild: message.guild.id, trainercode: code, trainername: trainername, discordname: discord };
        client.setTrainerCode.run(info);

        message.channel.send(code + " is now assigned to " + message.author+". Visit <http://tiny.cc/campsiepogo> to see changes");
    }
   

    sheet1.getRows(
        function (err, test) {
            var found = false;
            for (var i = 0; i < test.length; i++) {
                if (test[i].discordname == discord) {
                    test[i].trainercode = code
                    test[i].date_modified = date;

                    test[i].save(function () { console.log("ok") })
                    return;
                }

            }
            sheet1.addRow(info, function (err) { console.log(err) });


        })





}