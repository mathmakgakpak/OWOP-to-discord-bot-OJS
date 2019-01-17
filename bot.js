const Discord = require('discord.js');
var OwopJS = require('owop-js');
var OJS = new OwopJS.OJS({ws: 'wss://yourwsss.com', origin: 'https://yoursite.com'});
const bot = new Discord.Client({disableEveryone: true});

// Variables

const GuildId = "server id"; //YOUR SERVER ID
const ChannelId = "channnelid"; //GATEWAY CHANNEL ID
const AdminRole = "Role"; //ADMIN or owner ROLE
const BotToken = "bot token"; //BOT TOKEN
const AdminLogin = "adminlogin"; //ADMINLOGIN if you have... if no comment this...
const BNick = "Gateway"; //BOT NICK
const BWorld = "main"; //BOT WORLD
//const owopBotWss = "wss://owopforfun.herokuapp.com" //owop bot wss
//const owopbBotOrigin = "http://mathias377tests.netlify.com" //owop bot origin (name of site)

bot.on("ready", async () => {
    console.log(`\n\x1b[46m`, `${bot.user.username} is online on ${bot.guilds.size} servers!\x1b[0m`);
	
	setInterval(function () { 
    bot.user.setActivity("https://owoppa.netlify.com", {
        type: "PLAYING"
		});

		setTimeout(function () {
			bot.user.setActivity("mathias377", {
				type: "PLAYING"
				});
		}, 5000); 
	}, 10000); 
	
  });

  OJS.on("open", async function () {
    await OJS.world.join(BWorld);
    await OJS.chat.nick(BNick);
    await OJS.world.move(999999999, 999999999);
    await OJS.interact.controller();
    // < COMMENT THIS CODE IF YOUR OWOP IS NOT ON HEROKU, AND YOU ARE NOT ADMIN
    //await OJS.chat.adminlogin(AdminLogin);
    setInterval(async function () {
       await OJS.chat.adminlogin(AdminLogin); // For not sleepy dinos.
    },8000);
    // > COMMENT THIS CODE IF YOUR OWOP IS NOT ON HEROKU, AND YOU ARE NOT ADMIN
  });
  OJS.on("message", function (data) {
    OJS.chat.recvModifier(data.data)
    OJS.util.messageHandler(data.data);
    if(!Buffer.isBuffer(data.data) && !data.data.startsWith('You are') && !data.data.startsWith('FAIL') && !data.data.startsWith('<') && !data.data.startsWith('Connected!') && !data.data.startsWith('[D]') && !data.data.startsWith('Got') && !data.data.startsWith('DEV') && !data.data.startsWith('Nickname') && !data.data.startsWith('Server')) {
      msg = data.data.replace(/<(?:.|\n)*?>/gm, ""); //some html nicks dont work 
  bot.guilds.get(GuildId).channels.get(ChannelId).send(msg)
  };
  });
  OJS.on("close", function () {
    console.log('[OWOP.js]: Disconnected.')
  });

setTimeout(function () {
  bot.on("message", async (message) => {
    if(message.channel.id == ChannelId) {
      message.content = message.content.replace(/<@([0-9]+)>/g, "(here ping)");
      if (message.author.bot) return;
      if (message.channel.type === "dm") return;
      if(message.content.includes('<') && message.content.includes('onerror=') && message.content.includes('>')) return;

      OJS.chat.send(`/sayraw [D] ${message.author.username}: ${message.content}`);
    } else if(message.content.startsWith('!OJS')) {
      if(message.member.roles.find("name", AdminRole)) {
        try {
          eval(message.content.slice(1));
          message.reply('Success!');
        } catch(e) {
          message.reply('Error.');
        }
      } else {message.reply('You are not admin!')};
    }
  });
},3000)


bot.login(BotToken);
