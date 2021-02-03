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
            .setDescription("we hebben verschillende commands, Hallo, maarteninfo, joininfo")
            .setColor("#4F98D2")
            .addField("Bot naam", client.user.username)
 
            .setThumbnail('https://i.imgur.com/3JxM4xZ.jpeg')
            .setImage('https://i.imgur.com/uBLvfew.jpeg')
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
 
});

client.on('message', message => {

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'rps') {
        const acceptedReplies = ['steen', 'papier', 'schaar'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return message.channel.send(`Hoe te spelen: \`${prefix}rps <steen|papier|schaar>\``);
        if (!acceptedReplies.includes(choice)) return message.channel.send(`Alleen deze antwoorden mogen: \`${acceptedReplies.join(', ')}\``);
        
        console.log('Bot Result:', result);
        if (result === choice) return message.reply("Gelijk spel! we hadden de zelfde keus.");
        
        switch (choice) {
            case 'steen': {
                if (result === 'papier') return message.reply('Ik win!');
                else return message.reply('Jij wint!');
            }
            case 'papier': {
                if (result === 'schaar') return message.reply('Ik win!');
                else return message.reply('Jij wint!');        
            }
            case 'schaar': {
                if (result === 'steen') return message.reply('Ik win!');
                else return message.reply('Jij wint!');
            }
            default: {
                return message.channel.send(`Alleen deze antwoorden: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
});
