const discord = require("discord.js");
const botConfig = require("./botconfig.json");
 
const client = new discord.Client();
client.login(process.env.TOKEN);
 

client.on('ready', () => {

    console.log('I am ready!');

});
 
 
client.on("message", async message => {
 
    if(message.author.bot) return;
 
    if(message.channel.type === "dm") return;
 
    var prefix = botConfig.prefix;
 
    var messageArray = message.content.split(" ");
 
    var command = messageArray[0];
 
    if (command === `${prefix}hallo`) {
 
        return message.channel.send("Hallo!!");
    
    }

    if (command === `${prefix}maarteninfo`) {
        // Embed wat we gaan laten tonen.
        var botEmbed = new discord.MessageEmbed()
            .setTitle('Bot info')
            .setDescription("Maarten BOT! We hebben een eigen bot, gemaakt door Thom986 (contacteer hem voor suggesties of opmerkingen). Maarten is ook heel handig, hij kan namelijk mensen op fucken door ze te kicken(Alleen onder toezicht van een moderator). Verder is hij wel braaf")
            .setColor("#4F98D2")
            .addField("Bot naam", client.user.username)
 
            .setThumbnail('https://i.imgur.com/3JxM4xZ.jpeg')
            .setImage('https://i.imgur.com/uBLvfew.jpeg')
            .setTimestamp()
            .setFooter('maarten was er helaas niet', 'https://i.imgur.com/Ezu9ZV5.jpeg');
 
        // Terug sturen van het bericht
        return message.channel.send(botEmbed);
    }
	if (command === `${prefix}maartencommands`) {
        // Embed wat we gaan laten tonen.
        var botEmbed = new discord.MessageEmbed()
            .setTitle('Bot info')
            .setDescription("we hebben verschillende commands: Hallo, maarteninfo, joininfo, ping(negeer carl), pong, mevrouw, meneer, beep, server, kpop?, alleen thuis, slapen?, genders?, goednieuws")
            .setColor("#4F98D2")
            .addField("Bot naam", client.user.username)
 
            .setThumbnail('https://static.limburger.nl/Assets/Images_Upload/2019/06/08/dc1979ca-89d8-11e9-9a8b-379831f0eb46_web_translate_0_-68__scale_0.0974889_0.0974889__.jpg?maxheight=280&maxwidth=400')
            .setImage('https://pbs.twimg.com/media/ECUrbrDX4AALbyC.jpg')
            .setTimestamp()
            .setFooter('maarten was er helaas niet', 'https://i.imgur.com/Ezu9ZV5.jpeg');
 
        // Terug sturen van het bericht
        return message.channel.send(botEmbed);
    }
   
 
    // .addFields(
    //     {name:"Bot naam",value: bot.user.username},
    //     {name:"Bot naam",value: bot.user.username}
    // )
 
    if (command === `${prefix}joininfo`) {
 
        var serverEmbed = new discord.MessageEmbed()
            .setDescription("member info")
            .setColor("#4F98D2")
            .addField("Botnaam", client.user.username)
            .addField("Je bent deze server gejoind op", message.member.joinedAt)
            .addField("Totaal memebers", message.guild.memberCount);
 
        return message.channel.send(serverEmbed);
    }
 
        if (command === `${prefix}kick`) {

        const args = message.content.slice(prefix.length).split(/ +/);

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("sorry jij kan dit niet");

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen perms");

        if (!args[1]) return message.reply("Geen gebruiker opgegeven.");

        if (!args[2]) return message.reply("Gelieve een redenen op te geven.");

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        var reason = args.slice(2).join(" ");

        if (!kickUser) return message.reply("Kan de gebruiker niet vinden.");

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(kickUser.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`** Gekickt:** ${kickUser} (${kickUser.id})
            **Gekickt door:** ${message.author}
            **Redenen: ** ${reason}`);

        var embedPrompt = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Gelieve te reageren binnen 30 sec.")
            .setDescription(`Wil je ${kickUser} kicken?`);


        message.channel.send(embedPrompt).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


            // We kijken dat het de gebruiker is die het als eerste heeft uitgevoerd.
            // message.channel.awaitMessages(m => m.author.id == message.author.id,
            //     { max: 1, time: 30000 }).then(collected => {

            //         if (collected.first().content.toLowerCase() == 'yes') {
            //             message.reply('Kick speler.');
            //         }
            //         else
            //             message.reply('Geanuleerd');

            //     }).catch(() => {
            //         message.reply('Geen antwoord na 30 sec, geanuleerd.');
            //     });


            if (emoji === "✅") {

                msg.delete();

                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets foutgegaan.`);
                });

                message.reply(embed);

            } else if (emoji === "❌") {

                msg.delete();

                message.reply("Kick geanuleerd").then(m => m.delete(5000));

            }

        });
    }


    if (command === `${prefix}ban`) {

        const args = message.content.slice(prefix.length).split(/ +/);

        if (!args[1]) return message.reply("Geen gebruiker opgegeven.");

        if (!args[2]) return message.reply("Gelieve een redenen op te geven.");

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("sorry jij kan dit niet");

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Geen perms");

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        var reason = args.slice(2).join(" ");

        if (!banUser) return message.reply("Kan de gebruiker niet vinden.");

        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(banUser.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`** Geband:** ${banUser} (${banUser.id})
            **Geband door:** ${message.author}
            **Redenen: ** ${reason}`);

        var embedPrompt = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Gelieve te reageren binnen 30 sec.")
            .setDescription(`Wil je ${banUser} bannen?`);


        message.channel.send(embedPrompt).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


            // We kijken dat het de gebruiker is die het als eerste heeft uitgevoerd.
            // message.channel.awaitMessages(m => m.author.id == message.author.id,
            //     { max: 1, time: 30000 }).then(collected => {

            //         if (collected.first().content.toLowerCase() == 'yes') {
            //             message.reply('Kick speler.');
            //         }
            //         else
            //             message.reply('Geanuleerd');

            //     }).catch(() => {
            //         message.reply('Geen antwoord na 30 sec, geanuleerd.');
            //     });


            if (emoji === "✅") {

                msg.delete();

                
                banUser.ban(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets foutgegaan.`);
                });

                message.reply(embed);

            } else if (emoji === "❌") {

                msg.delete();

                message.reply("Ban geanuleerd").then(m => m.delete(5000));

            }

        });
    }

// Emojis aan teksten kopellen.
async function promptMessage(message, author, time, reactions) {
    // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
    time *= 1000;

    // We gaan ieder meegegeven reactie onder de reactie plaatsen.
    for (const reaction of reactions) {
        await message.react(reaction);
    }

    // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
    // dan kunnen we een bericht terug sturen.
    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
    // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}
 
 if (message.content.startsWith(`${prefix}ping`)) {
	message.channel.send('Pong.');
} else if (message.content.startsWith(`${prefix}beep`)) {
	message.channel.send('Boop.');
} else if (message.content === `${prefix}server`) {
	message.channel.send(`De naam van de server is: ${message.guild.name}`);
} else if (message.content === `${prefix}pong`) {
	message.channel.send(`ping.`);
} else if (message.content === `${prefix}mevrouw`) {
	message.channel.send(`Meneer`);
} else if (message.content === `${prefix}meneer`) {
	message.channel.send(`Mevrouw`);
} else if (message.content === `${prefix}kpop?`) {
	message.channel.send(`Verschrikkelijk, wat pauper! (behalve gangnamstyle)`);
} else if (message.content === `${prefix}kpop?`) {
	message.channel.send(`Verschrikkelijk, wat pauper! (behalve gangnamstyle)`);
} else if (message.content === `${prefix}slapen?`) {
	message.channel.send(`Slapen is voor luie mensen! Ga lekker een boek lezen.`);
} else if (message.content === `${prefix}alleen thuis`) {
	message.channel.send(`Ik snack alles wat er in huis is.`);
} else if (message.content === `${prefix}genders?`) {
	message.channel.send(`Gender maakt niet uit, *de één houd van piemeltjes en de ander van poesjes*`);
} else if (message.content === `${prefix}goednieuws`) {
	message.channel.send(`Ik heb goednieuws, u gaat dood.*`);
}  
 
});


