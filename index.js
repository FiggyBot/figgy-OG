require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const enmap = require('enmap')
const myEnmap = new enmap();
const channel_names = ['general', 'welcome']
client.commands = new Discord.Collection();
const cooldown = new Map();
const defaultprefix = '-';
client.mongoose = require('./utilis/mongoose');
let cdSeconds = 3;
const setPrefix = new enmap({name: 'setPrefix', autoFetch: true, fetchAll: true});
const deleteBase = new enmap({name: 'messagedeleter', autoFetch: true, fetchAll: true})
const cooldownDB = new enmap({name: 'cooldownDB', autoFetch: true, fetchAll: true})
const cooldownoption = new enmap({name: 'cooldownoption', autoFetch: true, fetchAll: true})
const sensitviveDB = new enmap({name: 'sensitiveDB', autoFetch: true, fetchAll: true})
const currencysystem = new enmap({name: 'currency', autoFetch: true, fetchAll: true})
const blacklistDB = new enmap({name: 'blacklistDB', autoFetch: true, fetchAll: true})


// client.on("guildCreate", guild => {
//     const fs = require('fs');
//     const commandsFiles = fs.readdirSync('../models/guildCreate').filter(file => file.endsWith('.js'));
// })

client.on("guildMemberAdd", member => {
    if (Date.now() - member.user.createdAt < 86400000) {
        member.send('your account isnt old enough to be in the server all accounts that are under 1 day old are kicked please join again when you meet the requirements').then(sentMessage => {
        member.kick({ reason: 'young account'})
        .catch(error => console.error("kicking didn't work", error));})}
});


client.once('ready', () => {
    console.log('Expressing figgy around the world');
    client.user.setActivity(`prefix "-" I am currently in ` + client.guilds.cache.size + ` servers can we hit 100 servers before christmas ?`)
    client.guilds.cache.each(function(guild, id ){
        if(!setPrefix.has(id))setPrefix.set(id, '-')
    }) 
    console.log(setPrefix);
})
client.on('message', async(message)=> {
    //normal emojis
    const prefix = setPrefix.get(message.guild.id)
    const command = message.content.toLowerCase();
    if (!message.content.includes(prefix)) return;
    if (message.author.bot) return;
    if (message.content.slice(prefix.length).length < 1) return;
        if(cooldownDB.has(message.author.id)){
            message.delete();
            message.reply('You have to wait 3 seconds between commands.');
            return;
    }
    if(blacklistDB.has(message.author.id)){
        return;
    }
    if(deleteBase.get(message.guild.id)){
        message.delete()
    }

    const args = message.content.slice(prefix.length).split(/ +/g)

    if(!message.member.hasPermission('ADMINISTRATOR') && cooldownoption.get(message.guild.id))
        cooldownDB.set(message.author.id)
    

    

    if (command.includes(prefix + 'member')){
        let allMembers = 0;
        client.guilds.cache.each(function(guild, id){
            allMembers += guild.memberCount
        });
        message.channel.send(`**Number of members using figgy: ${allMembers}**`);
        }
    //help emote commands (no animations)
    else if(command.includes(prefix + 'blush')){
        message.channel.send ('<:blush:753820368682221571>');
    }
    
    // else if(command.includes(prefix + 'uno'))
    //     message.channel.send('<:uno:742128449119846471>');

    else if(command.includes(prefix + 'sad'))
        message.channel.send('<:sad:758470864961536023>');

    else if(command.includes(prefix + 'holy'))
        message.channel.send('<:holy:753660049200775300>');

    else if(command.includes(prefix + 'gun'))
        message.channel.send('<:savage:753474247061667923>');

    else if(command.includes(prefix + 'lol'))
        message.channel.send('<:lol:753685865280176190>');

    else if(command.includes(prefix + 'lmao'))
        message.channel.send('<:hurtslmao:758442653502144583>');

    else if(command.includes(prefix + 'troll'))
        message.channel.send('<:troll:758441781372649543>');

    else if(command.includes(prefix + 'wheeze'))
        message.channel.send('<:wheeze:758441400689492029>');

    else if(command.includes(prefix + 'cursedflush'))
        message.channel.send('<:cursedflush:758442175704334407>');

    else if(command.includes(prefix + 'ugh'))
        message.channel.send('<:ugh:758832654140571699>');

    else if(command.includes(prefix + 'tink'))
        message.channel.send('<:tink:758832638470782977>');

    else if(command.includes(prefix + 'thunk'))
        message.channel.send('<:thunk:758832618643914752>');

    else if(command.includes(prefix + 'tear'))
        message.channel.send('<:tears:765788012914802718>');

    else if(command.includes(prefix + 'cri'))
        message.channel.send('<:cri:760197223710588949>');

    else if(command.includes(prefix + 'clown'))
        message.channel.send('<:clown:761312759530651699>');

    else if(command.includes(prefix + 'kappa'))
        message.channel.send('<:kappa:772672636441591859>');
        
    else if(command.includes(prefix + 'goo'))
        message.channel.send('<:goo:763960523946459136>');

    else if(command.includes(prefix + 'evilgoo'))
        message.channel.send('<:evilgoo:763960534323953694>');

    //animated basic emotes

    else if(command.includes(prefix + 'peace'))
        message.channel.send('<a:cpeace:760624134035865610>');

    else if(command.includes(prefix + 'girldance'))
        message.channel.send('<a:girldance:765797942975922248>');

    else if(command.includes(prefix + 'mariodance'))
        message.channel.send('<a:Mariodance:753301785338314822>');


    //pepe emotes (basic)

    else if(command.includes(prefix + 'wokepepe'))
        message.channel.send('<:WokePepe:753301201553981540>');

    else if(command.includes(prefix + 'feelsbanman'))
        message.channel.send('<:FeelsBanMan:753301201138876498>');

    else if(command.includes(prefix + 'festivepepe'))
        message.channel.send('<:festivepepe:753301201117773927>');

    else if(command.includes(prefix + 'monkastab'))
        message.channel.send('<:monkaStab:753301201319100458>');

    else if(command.includes(prefix + 'pepoblush'))
        message.channel.send('<:pepoblush:764377335234822144>');

    else if(command.includes(prefix + 'pepeno'))
        message.channel.send('<:pepeno:764376667598487603>');

    else if(command.includes(prefix + 'pepeyikes'))
        message.channel.send('<:PepeYikes:753301200694149161>');

    else if(command.includes(prefix + 'pepehappy'))
        message.channel.send('<:PepeHappy:753301202313412760>');

    else if(command.includes(prefix + 'pepesad'))
        message.channel.send('<:sadman:761257547876532236>');

    else if(command.includes(prefix + 'pepepopcorn'))
        message.channel.send('<:pepepopcorn:764373672457928704>');

    else if(command.includes(prefix + 'pepeyes'))
        message.channel.send('<:pepeyes:764373895674724373>');

    else if(command.includes(prefix + 'pepewow'))
        message.channel.send('<:pepewow:764337276284698644>');

    else if(command.includes(prefix + 'pepetos'))
        message.channel.send('<:pepetos:764373800434663435>');

    //pepe emotes (animated)

    else if(command.includes(prefix + 'pepejam'))
        message.channel.send('<a:Pepejam:753300508331999303>'); 

    else if(command.includes(prefix + 'pepesaber'))
        message.channel.send('<a:5628_pepe_saber:761313460990509097>');

    //pog emotes (non animated (there are no animated ones yet))

    else if(command.includes(prefix + 'poggu'))
        message.channel.send('<:pog:761088549473878027>');

    else if(command.includes(prefix + 'poglaugh'))
        message.channel.send('<:poglaugh:761088573536862209>');

    else if(command.includes(prefix + 'pogsus'))
        message.channel.send('<:pogsus:761088593467932732>');

    else if(command.includes(prefix + 'pogfr'))
        message.channel.send('<:pogf:761088620009750568>');
    
    else if(command.includes(prefix + 'pogchomp'))
        message.channel.send('<:PogChomp:767520306041585704>')

    //animated pog emotes

    else if(command.includes(prefix + 'pogfish'))
        message.channel.send('<a:POGFish:767520020334772255>');  

    else if(command.includes(prefix + 'pogslide'))
        message.channel.send('<a:POGSLIDE:767520396844335156>');

    //help meme emotes (non animated)


    else if(command.includes(prefix + 'memenob'))
        message.channel.send('<:memenob:753301785560612936>');

    else if(command.includes(prefix + 'pog_elmo'))
        message.channel.send('<:pog_elmo:753301785472663722>');

    else if(command.includes(prefix + 'knuckles'))
        message.channel.send('<:knuckles:753758432082788442>');

    else if(command.includes(prefix + 'pikagun'))
        message.channel.send('<:pikagun:758468075854102539>');

    else if(command.includes(prefix + 'sip'))
        message.channel.send('<:sip:760211961950109776>');

    else if(command.includes(prefix + 'monkawae'))
        message.channel.send('<:MonkaWae:753301201176625372>');

    else if(command.includes(prefix + 'rat'))
        message.channel.send('<:jan:743310729075228672>');

    else if(command.includes(prefix + 'ree'))
        message.channel.send('<:reee:764620561754095646>');

    else if(command.includes(prefix + 'wearybread'))
        message.channel.send('<:3519_moaningbread:761313461723594782>');

    else if(command.includes(prefix + 'gruno'))
        message.channel.send('<:gruno:761253158386139207>');

    else if(command.includes(prefix + 'depression'))
        message.channel.send('<:sadcat:761253172407828510>');

    else if(command.includes(prefix + 'lul'))
        message.channel.send('<:lul:767516288402325534>');

    else if(command.includes(prefix + 'whaknuckles'))
        message.channel.send('<:wutknuckles:761284578404204564>');

    else if(command.includes(prefix + 'bige'))
        message.channel.send('<:oof:746787451074379866>');

    else if(command.includes(prefix + 'bruh'))
        message.channel.send('<:bruh:762768022590455809>');

    else if(command.includes(prefix + 'kekw'))
        message.channel.send('<:kekw:762130817643577367>');

    else if(command.includes(prefix + 'wut'))
        message.channel.send('<:wut:770359750927712307>');

    else if(command.includes(prefix + 'topkek'))
        message.channel.send('<:topkek:764350738478137345>');

    else if(command.includes(prefix + 'youtried'))
        message.channel.send('<:youtried:764337124840439831>');

    else if(command.includes(prefix + 'stonks'))
        message.channel.send('<:stonks:764370836743782431>');

    else if(command.includes(prefix + 'notstonks'))
        message.channel.send('<:notstonks:764371730465816588>');

    else if(command.includes(prefix + 'stare'))
        message.channel.send('<:stare:764371337573564416>');

    else if(command.includes(prefix + 'doggo'))
        message.channel.send('<:kek:764731252875460659>');

    else if(command.includes(prefix + 'oeyes'))
        message.channel.send('<:oeyes:764336995199090688>');

    else if(command.includes(prefix + 'perhap'))
        message.channel.send('<:perhaps:761252430750416977>');
    
    else if(command.includes(prefix + 'cancel levee'))
        message.channel.send('<:cancellevees:767139279146057808>');

    else if(command.includes(prefix + 'gru'))
        message.channel.send('<:gru:765407197210345512>');

    else if(command.includes(prefix + 'illumgay'))
        message.channel.send('<:illumgay:746455813564137502>');

    else if(command.includes(prefix + 'comedy'))
        message.channel.send('<:Comedy:769040268875005963>');

    //meme emotes (animated)

    else if(command.includes(prefix + 'spoopydance'))
        message.channel.send('<a:spoopydance:764337021979459604>');

    else if(command.includes(prefix + 'shinyfurret'))
        message.channel.send('<a:shinyfurret:753461843359563796>');

    else if(command.includes(prefix + 'crabrave'))
        message.channel.send('<a:crabrave:753301786512719879>');

    else if(command.includes(prefix + 'yoshi'))
        message.channel.send('<a:yoshi:764337105907875865>');

    else if(command.includes(prefix + 'umm'))
        message.channel.send('<a:umm:764337042967756821>');

    else if(command.includes(prefix + 'yay'))
        message.channel.send('<a:yay:764337197637435402>');

    // else if(command.includes(prefix + 'yeet'))
    //     message.channel.send('<a:yeet:764337086836375572>');

    else if(command.includes(prefix + 'dance'))
        message.channel.send('<a:dance:761253141366571069>');

    else if(command.includes(prefix + 'squidward'))
        message.channel.send('<a:squidward:753300508965601290>');

    else if(command.includes(prefix + 'dogmeme'))
        message.channel.send('<a:dogmeme:753301786311262238>');

    else if(command.includes(prefix + 'trulyamazing'))
        message.channel.send('<a:trulyamazing:761614163335708704>');

    else if (command.includes(prefix + 'gerberlife'))
        message.channel.send('<a:puggy:773945596297216020>');

    else if(command.includes(prefix + 'floushed'))
        message.channel.send('<a:floushed:761614759409352744>');


    //blob emotes

    else if(command.includes(prefix + 'blobwhat'))
        message.channel.send('<:BlobWaitWhat:769040239452487681>');
    
    else if(command.includes(prefix + 'blobmoney'))
        message.channel.send('<:BlobMoneyMouth:769040204085854218>');
    
    else if(command.includes(prefix + 'blobevil'))
        message.channel.send('<:BlobEvil:769040083596083210>');

    else if(command.includes(prefix + 'blobcat'))
        message.channel.send('<:BlobCat:769040062054662164>');

    else if(command.includes(prefix + 'blobpls'))
        message.channel.send('<:Blob_yes_Please:769040035303129158>');

    else if(command.includes(prefix + 'blobsweat'))
        message.channel.send('<:Blob_Sweat:769040000079495199>');

    else if(command.includes(prefix + 'blobsurprised'))
        message.channel.send('<:Blob_Surprised:769039979396726855>');

    else if(command.includes('blobstop'))
        message.channel.send('<:Blob_Stop:769039954931220500>');

    else if(command.includes(prefix + 'blobno'))
        message.channel.send('<:Blob_No:769039918299086878>');

    else if(command.includes(prefix + 'blobnty'))
        message.channel.send('<:Blob_no_Thanks:769039933654040616>')

    else if(command.includes(prefix + 'blobhype'))
        message.channel.send('<:Blob_Hype:769039891665125417>');

    else if(command.includes(prefix + 'blobf'))
        message.channel.send('<:Blob_F:769039877789974568>');

    else if(command.includes(prefix + 'blobdumb'))
        message.channel.send('<:Blob_Dumbo:769039862623109140>');
    
    else if(command.includes(prefix + 'blobban'))
        message.channel.send('<:Blob_Ban:769039846877560833>');

    else if(command.includes(prefix + 'blobcry'))
        message.channel.send('<:Blob_About_To_Cry:769039823897624576>');

    else if(command.includes(prefix + 'blobsanta'))
        message.channel.send('<:Blobsanta:771541148627238933>');

    else if(command.includes(prefix + 'blobscarf'))
        message.channel.send('<:Blobscarf:771541125085397002>');

    else if(command.includes(prefix + 'blobpirate'))
        message.channel.send('<:BlobPirate:771541096652210186>');

    else if(command.includes(prefix + 'blobnitro'))
        message.channel.send('<:BlobNitro:771541074530795551>');

    else if(command.includes(prefix + 'blobninja'))
        message.channel.send('<:BlobNinja:771541053274193971>');

    else if(command.includes(prefix + 'blobwink'))
        message.channel.send('<:BlobWink:771540396839796746>');

    else if(command.includes(prefix + 'blobyum'))
        message.channel.send('<:BlobYum:771540376473042954>');

    else if(command.includes(prefix + 'blobcheeky'))
        message.channel.send('<:BlobCheeky:771540342428270603>');

    else if(command.includes(prefix + 'blobpanic'))
        message.channel.send('<:BlobPanic:771539891146194985>');

    else if(command.includes(prefix + 'blobpray'))
        message.channel.send('<:BlobPray:771539866626031647>');

    else if(command.includes(prefix + 'blobdizzy'))
        message.channel.send('<:BlobDizzy:771539825161011220>');

    else if(command.includes(prefix + 'blobvomit'))
        message.channel.send('<:BlobVomiting:771539028322549780>');

    else if(command.includes(prefix + 'blobtongue'))
        message.channel.send('<:BlobTongue:771539010354806866>');

    else if(command.includes(prefix + 'blobscared'))
        message.channel.send('<:Blobfearful:771538691445358612>');

    else if(command.includes(prefix + 'blobdetective'))
        message.channel.send('<:Blobdetective:771538663695056976>');

    else if(command.includes(prefix + 'blobrofl'))
        message.channel.send('<:blobrofl:771538414411317300>');

    else if(command.includes(prefix + 'blobsmilesweat'))
        message.channel.send('<:Blobsmileysweat:771538040135876618>');

    else if(command.includes(prefix + 'blobcool'))
        message.channel.send('<:Blobcool:771537847290953779>');

    else if(command.includes(prefix + 'blobartist'))
        message.channel.send('<:BlobArtist:771508712077525013>');

    //blob emotes (animated)

    else if(command.includes(prefix + 'blobjuice'))
        message.channel.send('<a:blobjuice:769055092871135234>');
        
    else if(command.includes(prefix + 'blobpopcorn'))
        message.channel.send('<a:blobpopcorn:769263351401676840>');

       
//panda emotes

    else if(command.includes(prefix + 'pandayes'))
        message.channel.send('<:YesPanda:771107722770513921>');

    else if(command.includes(prefix + 'derpanda'))
        message.channel.send('<:DerpPanda:771107694311374848>');

    else if(command.includes(prefix + 'pandacheeks'))
        message.channel.send('<:PandaCheeks:771107149290930186>');

    else if(command.includes(prefix + 'pandasleep'))
        message.channel.send('<:PandaSleep:771106804133527562>');        

    else if(command.includes(prefix + 'pandashrug'))
        message.channel.send('<:PandaShrug:771106777110413334>');

    else if(command.includes(prefix + 'ohpanda'))
        message.channel.send('<:OhPanda:771106739898286140>');

    else if(command.includes(prefix + 'pandasad'))
        message.channel.send('<:PandaSad:771106202410942536>');

    else if(command.includes(prefix + 'pandacry'))
        message.channel.send('<:PandaCry:771106176007798835>');

    else if(command.includes(prefix + 'pandacop'))
        message.channel.send('<:PandaCop:771105876911325214>');

    else if(command.includes(prefix + 'pandafight'))
        message.channel.send('<:FightPanda:771105228174262273>');

    else if(command.includes(prefix + 'pandafish'))
        message.channel.send('<:PandaFish:771104823734042664>');

    else if(command.includes(prefix + 'pandayay'))
        message.channel.send('<:Pandayay:771104757828943892>');

    else if(command.includes(prefix + 'pandaevil'))
        message.channel.send('<:PandaEvil:771104716234817536>');

    else if(command.includes(prefix + 'duckypanda'))
        message.channel.send('<:DuckyPanda:771104654108131399>');

    else if(command.includes(prefix + 'pandasip'))
        message.channel.send('<:SipPanda:771104107548114974>');

    else if(command.includes(prefix + 'pandakin'))
        message.channel.send('<:Pandakin:771103710327472148>');

    else if(command.includes(prefix + 'pandacool'))
        message.channel.send('<:PandaCool:771103967949750314>');

    else if(command.includes(prefix + 'angrypanda'))
        message.channel.send('<:AngryPanda:771103122722258965>');

    else if(command.includes(prefix + 'pandapopcorn'))
        message.channel.send('<:PandaPopcorn:771102578728501248>');

    else if(command.includes(prefix + 'pandawow'))
        message.channel.send('<:WowPanda:771102019036381195>');

    else if(command.includes(prefix + 'pandathonk'))
        message.channel.send('<:ThonkPanda:771101856457555989>');

//shrek emotes 

    else if(command.includes(prefix + 'shrekw'))
        message.channel.send(`<:ShrekW:777237950970200116>`);

    else if(command.includes(prefix + 'shrekthink'))
        message.channel.send(`<:ShrekThink:777237916593291274>`);

    else if(command.includes(prefix + 'shrektastic'))
        message.channel.send(`<:shrektastic:777237884997992478>`);

    else if(command.includes(prefix + 'shrekohyes'))
        message.channel.send(`<:ShrekOHYES:777237847299719208>`);

    else if(command.includes(prefix + 'shrekhuh'))
        message.channel.send(`<:ShrekHuh:777237819982086194>`);

    else if(command.includes(prefix + 'shrekception'))
        message.channel.send(`<:Shrekception:777237796041392129>`);

    else if(command.includes(prefix + 'shrekbruh'))
        message.channel.send(`<:ShrekBruh:777237764273078288>`);

    else if(command.includes(prefix + 'shrekangry'))
        message.channel.send(`<:ShrekAngry:777237738310467625>`);

    else if(command.includes(prefix + 'feelshrekman'))
        message.channel.send(`<:FeelsShrekMan:777237696745701406>`);
//custom made figgy emotes

    else if(command.includes(prefix + 'figgysleep'))
        message.channel.send(`<:figgysleep:777593564195717152>`);

    else if(command.includes(prefix + 'agentfiggy'))
        message.channel.send(`<:agentfiggy:777593630239359007>`);
    
    else if(command.includes(prefix + 'figgybongo'))
        message.channel.send(`<:figgybongo:777705959120175124>`);


//christmas emojis (limited)

    else if(command.includes(prefix + 'xmasmirk'))
        message.channel.send(`<:FestiveMirk:783391256046338068>`)

    else if(command.includes(prefix + 'xmaspensive'))
        message.channel.send(`<:FestivePensive:783391232650117130>`)

    else if(command.includes(prefix + 'xmashuggy'))
        message.channel.send(`<:BlobNomChristmas:783389208399708200>`)

    else if(command.includes(prefix + 'xmasuno'))
        message.channel.send(`<:ChristmasReversal:783390360453775400>`)

    else if(command.includes(prefix + 'xmastink'))
        message.channel.send(`<:XmasTink:779113162892116028>`)

    else if(command.includes(prefix + 'xmasthunk'))
        message.channel.send(`<:XmasPepeThunk:779064351633440875>`)

    else if(command.includes(prefix + 'xmaspepega'))
        message.channel.send(`<:XmasPepeGa:779064158607507457>`)

    else if(command.includes(prefix + 'xmashappy'))
        message.channel.send(`<:XmasPeepoChristmas:779063537304862730>`)

    else if(command.includes(prefix + 'xmasgift'))
        message.channel.send(`<:XmasPeepoGift:779063715545874452>`)

    else if(command.includes(prefix + 'xmasfriends'))
        message.channel.send(`<:XmasPeepoFriends1:779063626002726932>`)

    // else if(command.includes(prefix + ''))
    //     message.channel.send(``)

    // else if(command.includes(prefix + ''))
    //     message.channel.send(``)

    // else if(command.includes(prefix + ''))
    //     message.channel.send(``)

    // else if(command.includes(prefix + ''))
    //     message.channel.send(``)

//non emoji 



    else if (message.content.includes(prefix + 'server'))
        message.channel.send('**figgy is currently in ' + client.guilds.cache.size + ' servers**');
    
    else if (message.content.includes(prefix + 'help pepe')){
        const pepembed = new Discord.MessageEmbed()
         .setTitle(`Pepe emotes`)
         .setColor(`RANDOM`)
         .setDescription(`Pepe emotes(**non animated**)
        -wokepepe
        -feelsbanman
        -festivepepe
        -monkastab
        -pepeyikes
        -pepoblush
        -pepeno
        -pepewow
        -pepehappy
        -pepesad
        -pepepopcorn
        -pepeyes
        -pepetos
    Pepe emotes(**animated**)
        -pepejam
        -pepesabers`)
         .setTimestamp();
        message.channel.send(pepembed);
    }
        else if (message.content.includes(prefix + 'help pog')){
            const pogembed = new Discord.MessageEmbed()
             .setTitle(`pog emotes`)
             .setColor(`RANDOM`)
             .setDescription(`Pog emotes(**non animated**)
            -poggu
            -poglaugh
            -pogsus
            -pogfr
            -pogchomp
            pog emotes (**animated**)
            -pogslide
            -pogfish`)
             .setTimestamp();
            message.channel.send(pogembed);
        }


    else if (message.content.includes(prefix + 'invite')){
        const invitesembed = new Discord.MessageEmbed()
         .setTitle(`Important Invites`)
         .setColor(`RANDOM`)
         .setDescription(`**server invite**: [support server invite](https://discord.com/invite/SruuH9k) \n
         **figgy invite**: [figgy bot invite](https://discord.com/oauth2/authorize?client_id=752618306325839944&scope=bot&permissions=2146958847)`)
         .setTimestamp();
        message.channel.send(invitesembed);
    }


    else if (message.content.includes(prefix + 'help meme')){
        const memembed = new Discord.MessageEmbed()
         .setTitle(`meme emotes`)
         .setColor(`RANDOM`)
         .setDescription(`Meme emotes (**non animated**)
        -memenob
        -pog_elmo
        -cancel levees
        -knuckles
        -pikagun
        -lul
        -comedy
        -sip
        -monkawae
        -rat
        -reee
        -wearybread
        -gruno
        -depression
        -whaknuckles
        -bige
        -bruh
        -kekw
        -wut
        -perhaps
        -topkek
        -youtried
        -stonks
        -notstonks
        -stare
        -gru
        -illumgay
        -doggo
        -oeyes
        **animated emojis**
        -shinyfurret
        -crabrave
        -yoshi
        -umm
        -spoopydance
        -popcornchomp
        -yay
        -yeet
        -dance
        -squidward
        -trulyamazing
        -dogmeme`)
         .setTimestamp();
        message.channel.send(memembed);
    }
       

    else if (message.content === (prefix + 'help emote') || message.content === (prefix + 'help emoji')){
        const emotembed = new Discord.MessageEmbed()
         .setTitle(`basic emotes`)
         .setColor(`RANDOM`)
         .setDescription(`**non animated emojis**
        -blush
        -uno
        -sad
        -holy
        -gun
        -lol
        -hurts
        -troll
        -wheeze
        -cursedflush
        -ugh
        -tink
        -thunk
        -goo
        -evilgoo
        -tears
        -cri
        -clown
        **animated emojis** 
        -peace
        -girldance
        -mariodance`)
         .setTimestamp();
        message.channel.send(emotembed);
    }

    else if (command.includes(prefix + 'comingsoon')){
        const comingsoon = new Discord.MessageEmbed()
        .setTitle(`Coming soon`)
        .setColor("RANDOM")
        .setDescription(`Probably going to release a whole new set of emotes next week hint: swamp
        Reactive mode maybe maybe not gonna drop teasers soon
        Fun commands
        Currency system (rent)
        Verifiying update :eyes:`)
        message.channel.send(comingsoon)
    }

    else if (message.content.includes(prefix + 'help blob')){
        const blobembed = new Discord.MessageEmbed()
         .setTitle(`Blob emotes help command`)
         .setColor(`RANDOM`)
         .setDescription(`**non animated emojis**
         -blobwhat
         -blobmoney
         -blobevil
         -blobcat
         -blobpls
         -blobsweat
         -blobsurprised
         -blobstop
         -blobno
         -blobnty
         -blobf
         -blobdumb
         -blobban
         -blobcry
         -blobsanta
         -blobscarf
         -blobpirate
         -blobnitro 
         -blobninja 
         -blobwink 
         -blobyum
         -blobcheeky
         -blobpanic
         -blobpray
         -blobdizzy
         -blobvomit
         -blobtongue
         -blobscared
         -blobdetective
         -blobrofl
         -blobsmilesweat
         -blobcool
         -blobartist
        **animated emojis**
         -blobjuice
         -blobpopcorn`)
         .setTimestamp()
        message.channel.send(blobembed);
    }

    else if (message.content === prefix + 'help panda'){
        const pandahelp = new Discord.MessageEmbed()
        .setTitle(`Panda emotes`)
        .setColor(`RANDOM`)
        .setDescription(`**Panda emotes (non animated)**:
        -pandayes
        -derpanda
        -pandacheeks
        -pandasleep
        -pandashrug
        -ohpanda
        -pandasad
        -pandacry
        -pandacop
        -pandafight
        -pandafish
        -pandayay
        -pandaevil
        -duckypanda
        -pandasip
        -pandakin
        -pandacool
        -angrypanda
        -pandapopcorn
        -pandawow
        -pandathonk`)
        message.channel.send(pandahelp)
    }

    else if (message.content.includes(prefix + 'help kick')){
        const kickembed = new Discord.MessageEmbed()
         .setTitle(`Kick reasons`)
         .setColor(`RANDOM`)
         .setDescription(`**All new accounts created within 24 hours will be kicked out of the server**
        this is to prevent alt accounts of people that are banned to join again and again
        After the accounts that have been kicked are officially 24 hours old or older they
        will be able to get in the server.`)
         .setTimestamp();
        message.channel.send(kickembed);
    }

    else if (message.content.includes(prefix + 'patchnotes')){
        const patchnotes = new Discord.MessageEmbed()
         .setTitle(`patchnotes`)
         .setDescription(`11/16/2020- Massive Figgy Update 

         What's New?- ALOT OF FEATURES. This update is action packed with a lot of features if I didn't release this all at once I would release this in a span of 3-4 weeks. Your welcome!
         Custom Figgy emotes: Our art team has worked hard to present you custom figgy emotes. We have 3 figgy emotes so far -agentfiggy, -bongofiggy, -figgysleep. For nitro users they can head over to our support server to use these emotes globally
         Emotes: While on the topic of emotes might as well mention Shrek Emotes now available in figgy. Do -help shrek for more information on that
         Databases- Databases are here You can now make custom prefixes, Toggle Cooldown on or off, Toggle Delete command after execution on or off. -setprefix -setcooldown, 
         -setdelete, 
         You can also reset these customization even if your prefix has been changed all the reset prefix will be "-". 
         -resetprefix, -resetcooldown, -resetdelete. To reset all these settings at once 
         -resetcustomization  For help you can also do -help customization
         Moderation commands 2 new moderation commands have been added this week. -slowmode (time) -removeslowmode This command sets slowmode instead of going in to do manually. There are shortened version of these commands more info in the moderation section. Permissions needed to use slowmode: MANAGE_MESSAGES or ADMINISTRATOR
         2nd moderation command: -nuke #channel-name Despite what the name might direct this is not a channel spammer. This command duplicates the channel and deletes the old one. This is so the users can redo their channels with a simple command rather than to have to manually go in and delete the channel. (Note: none of the pins or messages transfer from the old channel). Permissions needed to use nuke: ADMINISTRATOR 
         Fun/Misc Commands: These comma
         
         
         
         
         nds are self explanatory this is for fun and amusment: -gayrate, -simprate, -avatar \n -whois 
         More info on all of this in help page`)
         .setColor(`RANDOM`)
        message.channel.send(patchnotes)
    }

    else if (message.content.includes(prefix + 'help owner'))
        message.channel.send('Owner username - LaZeAsh#8675'); 

    else if (message.content === prefix + 'help'){
        const helpembed = new Discord.MessageEmbed()
         .setTitle(`help commands`)
         .setColor(`RANDOM`)
         .addFields([
             {name: `Emote commands`, value: `-help emote \n -help pepe \n -help pog \n-help blob \n -help panda \n -help shrek \n -help figgy, \n -help customization`, inline: true},
             {name:`Additional Info`, value: `-help owner \n -help kick \n -moderation \n -comingsoon`, inline: true},
             {name: `New Updates`, value: `-patchnotes\n         These are all the help commands if you need more help join our discord server:[support server invite](https://discord.gg/SruuH9k)
        invite me to more servers: [figgy bot invite](https://discord.com/oauth2/authorize?client_id=752618306325839944&scope=bot&permissions=2146958847)`, inline: true}
         ])
         .setTimestamp();
        message.author.send(helpembed)
        .then(m => message.channel.send(`**Help sent in dms :thumbsup:**`))
    }



    else if (message.content === prefix + 'moderation'){
        if(message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_MESSAGES")){
            const helpmod = new Discord.MessageEmbed()
            .setTitle(`Moderation help commands`)
            .setColor(`RANDOM`)
            .setDescription(`-ban + user + reason \n -kick + user + reason \n -purge + amount(between 2 and 100) \n -nuke + channel name`)
            message.channel.send(helpmod);
        }
    }

    else if (message.content === prefix + 'help shrek'){
        const shrekhelp = new Discord.MessageEmbed()
        .setTitle(`**Shrek emotes**`)
        .setColor(`RANDOM`)
        .setDescription(`**Shrek emotes (non animated)**: \n -shrekw \n -shrekthink \n -shrektastic
        -shrekohyes \n -shrekhuh \n -shrekception \n -shrekbruh \n -shrekangry \n -feelshrekman`)
        message.channel.send(shrekhelp);
    }
    else if(message.content === prefix + 'help fun'){
        const funhelp = new Discord.MessageEmbed()
        .setTitle(`**Help Commands**`)
        .setColor(`RANDOM`)
        .setDescription(`**Fun commands**: \n -gayrate (gr) \n -simprate (sr) \n -avatar (av)`)
        message.channel.send(funhelp);
    }
    
    else if (message.content.startsWith(prefix + 'event emote') || message.content.startsWith(prefix + 'event emoji')) {
        const eventembed = new Discord.MessageEmbed()
        .setTitle(`Event emotes`)
        .setDescription(``)
    }

    else if (message.content.includes(prefix + 'help figgy')){
        const figgyhelp = new Discord.MessageEmbed()
        .setTitle(`**Figgy emotes**`)
        .setColor(`RANDOM`)
        .setDescription(`**Figgy emotes**:\n -agentfiggy \n -figgysleep \n -figgybongo`)
        message.channel.send(figgyhelp);
    }

     else if (message.content === (prefix + 'help customization')){
        const helpcustom = new Discord.MessageEmbed()
        .setTitle(`**Customization**`)
        .setColor(`RANDOM`)
        .setDescription(`-setcooldown (yes or no) \n -setdelete (yes or no) \n -setprefix (your prefix here)`)
        message.channel.send(helpcustom);
    }

    else if (message.content.startsWith(prefix + "ban")) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("BAN_MEMBERS")){
        // const target = mentions.members.first();
            const { mentions } = message;
        let reason = args.slice(2).join(' ');
            const target = mentions.members.first();
            if(target === undefined){
                commandban = new Discord.MessageEmbed()
                .setTitle(`admin command ban`)
                .setDescription(`Format for ban: \n -ban + user + reason (optional)`)
                message.channel.send(commandban)
            }   
            else {
                if (target.id === message.author.id) return;
                const targetMember = message.guild.members.cache.get
                (target.id)
                if (targetMember.hasPermission("ADMINISTRATOR") || targetMember.hasPermission("MANAGE_MESSAGES")) return;
                if(targetMember.id === '376041476917821441') return;
                const tag = `<@${targetMember.id}>`
                targetMember.send(`You have been banned for ` + reason)
                targetMember.ban()
                // const tag = `<@${target.id}>`
                message.channel.send(`${tag} has been banned`);
            }
        }   
    } 

    else if (message.content.startsWith(prefix + "kick")) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("KICK_MEMBERS")){
            const { mentions } = message;
            let reason = args.slice(2).join(' ');
            const target = mentions.members.first();
            if(target === undefined){
                commandkick = new Discord.MessageEmbed()
                .setTitle(`moderator command kick`)
                .setDescription(`Format for kick: \n -kick + user + reason (optional)`)
                message.channel.send(commandkick);
            }
            else {
                if (target.id === message.author.id) return;
                const targetMember = message.guild.members.cache.get
                (target.id)
                if (targetMember.hasPermission("ADMINISTRATOR") || targetMember.hasPermission("MANAGE_MESSAGES")) return;
                if(targetMember.id === '376041476917821441') return;
                targetMember.send(`You have been kicked for ` + reason)
                targetMember.kick(reason);
                // targetMember.send(`You have been kicked for ` + reason)
                const tag = `<@${target.id}>`
                message.channel.send(`${tag} has been kicked`);

            }
        }   
    }

    else if(command.includes(prefix + 'simprate') || command.includes(prefix + 'sr')){
        let percentage = Math.floor(Math.random()*100)
        const simpvictim = message.mentions.members.first()
        const simprate = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        if(simpvictim){
            simprate.setTitle(`**Simprate of ${simpvictim.user.username}**`)
            simprate.setDescription(`You are ${percentage}% simp`)
            simprate.setTimestamp()
            simprate.setImage(simpvictim.user.displayAvatarURL({dynamic: true}))
            message.channel.send(simprate)
        }
        else{
        simprate.setTitle(`**Simprate of ${message.author.username}**`)
        simprate.setDescription(`you are ${percentage}% simp`)
        simprate.setTimestamp()
        simprate.setImage(message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(simprate)
        }  
    }

    else if(command.includes(prefix + 'waifurate') || command.includes(prefix + 'wr')){
        let percentage = Math.floor(Math.random()*100)
        const waifuvictim = message.mentions.members.first()
        const waifurate = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        if(waifuvictim){
            waifurate.setTitle(`**Waifuness of ${waifuvictim.user.username}**`)
            waifurate.setDescription(`You are ${percentage}% a waifu :flushed:`)
            waifurate.setTimestamp()
            waifurate.setImage(waifuvictim.user.displayAvatarURL({dynamic: true}))
            message.channel.send(waifurate)
        }
        else{
        waifurate.setTitle(`**Waifuness of ${message.author.username}**`)
        waifurate.setDescription(`You are ${percentage}% a waifu :flushed:`)
        waifurate.setTimestamp()
        waifurate.setImage(message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(waifurate)
        }  
    }

    else if(command.includes(prefix + 'husbandrate') || command.includes(prefix + 'hr')){
        let percentage = Math.floor(Math.random()*100)
        const husbandvictim = message.mentions.members.first()
        const husbandrate = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        if(husbandvictim){
            husbandrate.setTitle(`**Husbandrate of ${husbandvictim.user.username}**`)
            husbandrate.setDescription(`You are ${percentage}% a husband`)
            husbandrate.setTimestamp()
            husbandrate.setImage(husbandvictim.user.displayAvatarURL({dynamic: true}))
            message.channel.send(husbandrate)
        }
        else{
        husbandrate.setTitle(`**Husbandrate of ${message.author.username}**`)
        husbandrate.setDescription(`You are ${percentage}% a husband`)
        husbandrate.setTimestamp()
        husbandrate.setImage(message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(husbandrate)
        }  
    }

    else if(command.startsWith(prefix + 'nuke')){
        if(message.member.hasPermission("ADMINISTRATOR")){
            const mentionedChannel = message.mentions.channels.first();
            if(!mentionedChannel)return message.reply(`**Please enter a channel to nuke**`);
            const oldname = mentionedChannel.name, oldposition = mentionedChannel.position;
            const clonedChannel = mentionedChannel.clone();
            (await (await clonedChannel).setName(oldname)).setPosition(oldposition);
            mentionedChannel.delete();
        }
    }


    else if(command.startsWith(prefix + 'slowmode') || (command.startsWith(prefix + 'sm'))){
        if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return;
                slowmode = args[1];
                message.channel.setRateLimitPerUser(slowmode)
            
            if(!args[1]){ 
                return message.channel.send('**Please specify for how many seconds you want to set the slowmode**');
            }
            if(!args[1]) return;   

            if(isNaN(slowmode)) return;

            if(slowmode < 0 || slowmode > 21600 ){
                message.channel.send(`**Please select a number less than 21600 or greater than 0**`)
                return;
            }

            message.channel.send(`**Slowmode set to ${slowmode} seconds**`)
    }
    else if(command.startsWith(prefix + 'removeslowmode') ||(command.startsWith(prefix + 'rsm'))){
        if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return;
            message.channel.setRateLimitPerUser(0)
            message.channel.send(`**Slowmode has been removed**`)
            return;
        }

    // else if(command.startsWith(prefix + 'whois') || command.startsWith(prefix + 'userinfo')){
    //     const whoismember = message.mentions.members.first()
    //     const whoisEmbed = new Discord.MessageEmbed()
    //     .setColor('RANDOM')
    //     if(whoismember){
    //         whoisEmbed.setTitle(`Who is ${whoismember.user.username}`)
    //         whoisEmbed.setImage(`${whoismember.user.displayAvatarURL({dynamic: true})}`)
    //         whoisEmbed.addFields([
    //             {name: `**Joined**`, value: `${whoismember.joinedAt.getDay()} ${whoismember.joinedAt.toDateString()} ${whoismember.joinedAt.getHours()}:${whoismember.joinedAt.getMinutes()}`, inline: true},
    //             {name: `**Registered**`, value: `${whoismember.user.createdAt.getDay()} ${whoismember.user.createdAt.toDateString()} ${whoismember.user.createdAt.getHours()}:${whoismember.user.createdAt.getMinutes()} `, inline: true},
    //             {name: `**Roles**`, value: `${whoismember.roles.cache.array()}`, inline: true}
    //         ])
    //         whoisEmbed.setFooter(`ID: ${whoismember.user.id}`)
    //         message.channel.send(whoisEmbed)

    //     } else {
    //         whoisEmbed.setTitle(`Who is ${message.author.username}`)
        
    //     }

    //}


    
    else if(message.content.includes(prefix + 'purge')){
        if(!message.member.hasPermission("ADMINISTRATOR") || 
        !message.member.hasPermission("MANAGE_MESSAGES")) return;
        const amount = Math.floor(args[1]);
        if (isNaN(amount)){
            return message.reply('please enter a value');

        } else if(amount <= 0    || amount > 100){
            return message.reply('you need to input a number between 1 - 100');

        }
        if (amount >= 1 || amount < 100){
            message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err)
            message.channel.send('There was a problem purging the messages')
            }).then (messages => {
            message.channel.send(`**successfully deleted ${messages.size} messages**`)
            .then(msg => msg.delete({
            timeout: 4000
                }))
            })
        }
    }

    else if(command.startsWith(prefix + 'avatar') || command.startsWith(prefix + 'av')){
        const avatarmember = message.mentions.users.first() || message.author
        const avatarEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${avatarmember.username}'s Avatar`)
        .setImage(avatarmember.displayAvatarURL({dynamic: true, size: 1024}));
        message.channel.send(avatarEmbed);
    }


    // else {
    //     message.delete()
    //     message.reply('Invalid command usage')
    //     .then(msg => msg.delete({
    //         timeout: 4000
    //     }))
    // }

    else if (command.startsWith(prefix + 'setprefix')){
        let prefixcmd = args[1]
        if(!prefixcmd){
            message.channel.send('**Please specify a prefix to change to**')
            return;
        }
        setPrefix.set(message.guild.id, prefixcmd)
        message.channel.send(`**Your prefix has been set to ${prefixcmd}**`);
    }
    
    else if (command.startsWith(prefix + 'setdelete')){
        if(!args[1]){
            message.channel.send(`**Please enter a valid answer (***yes, no***)**`)
            return;
        }
        let answer = args[1].toLowerCase();
        const valueSave = answer === 'yes' ? true : answer === 'no' ? false : null;
        if(valueSave === null){message.channel.send('**Please enter a yes or no answer**');return;}
        deleteBase.set(message.guild.id, valueSave);
        message.channel.send(`**Delete command has been set to ${answer}**`)
    }


    else if (command.startsWith(prefix + 'setcooldown')){
        if(!args[1]){
            message.channel.send(`**Please enter a valid answer (***yes, no***)**`)
            return;
        }
        let answer = args[1].toLowerCase();
        const valueSave = answer === 'yes' ? true : answer === 'no' ? false : null;
        if(valueSave === null){message.channel.send('**Please enter a yes or no answer**');return;}
        cooldownoption.set(message.guild.id, valueSave);
        message.channel.send(`**Cooldown command has been set to ${answer}**`)
    }

    else if (command.startsWith(prefix + 'setmature')){
        if(!args[1]){
            message.channel.send(`**Please enter a valid answer (***yes, no***)**`)
            return;
        }
        let answer = args[1].toLowerCase();
        const valueSave = answer === 'yes' ? true : answer === 'no' ? false : null;
        if(valueSave === null){message.channel.send('**Please enter a yes or no answer**');return;}
        sensitviveDB.set(message.guild.id, valueSave);
        message.channel.send(`**Mature content has been set to ${answer}**`)
    }

    else if(command.startsWith(prefix + '8ball')){
        const eightball = args[1]
        const prophecy = Math.floor(Math.random()*10)
        if(!args[1]){
            message.channel.send(`**Please specify an argument**`)
        }

        if(prophecy < 5){
            message.channel.send(`**${eightball} || :8ball: the 8balleth has spoketh no**`)
        }
        
        if(prophecy > 6){
            message.channel.send(`**${eightball} || :8ball: the 8balleth has spoketh yes**`)
        }


    }

            setTimeout(() => {
            cooldownDB.delete(message.author.id);
        }, cdSeconds * 1000);
})

client.on('message', message => {
    const command = message.content.toLowerCase();


    if(command.startsWith('-resetprefix')){
        setPrefix.set(message.guild.id, '-')
        message.channel.send(`**Your prefix has been reverted back to default (-)**`)
    }

    if(command.startsWith('-resetdelete')){
        deleteBase.set(message.guild.id, false)
        message.channel.send('**Your deletion options have been reverted back to do not delete after command triggered**')
    }

    if(command.startsWith('-resetcooldown')){
        cooldownoption.set(message.guild.id, false)
        message.channel.send('**Your cooldown options have been reseted to original settings (cooldown activated)**')
    }

    if(command.startsWith('-resetsensitive')){
        cooldownoption.set(message.guild.id, false)
        message.channel.send('**Sensitive commands will now be left out**')
    }

    if(command.startsWith('-resetcustomization')){
        setPrefix.set(message.guild.id, '-')
        deleteBase.set(message.guild.id, false)
        cooldownoption.set(message.guild.id, false)
        sensitviveDB.set(message.guild.id, false)
        message.channel.send(`**Your customizable options have been reverted back to default**`)
    }
})

client.on('message', async(message) => {
    const prefix = setPrefix.get(message.guild.id)
    const command = message.content.toLowerCase();
    const args = message.content.slice(prefix.length).split(/ +/g)
    if (!message.content.includes(prefix)) return;
    if (message.author.bot) return;
    if (message.content.slice(prefix.length).length < 1) return;
        if(cooldownDB.has(message.author.id)){
            message.delete();
            message.reply('You have to wait 3 seconds between commands.');
            return;
    }
    if(deleteBase.get(message.guild.id)){
        message.delete()
    }
    if(sensitviveDB.get(message.guild.id)){
        if(command.includes(prefix + 'thotrate') || command.includes(prefix + 'tr')){
            let percentage = Math.floor(Math.random()*100)
            const thotvictim = message.mentions.members.first()
            const thotrate = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            if(thotvictim){
                thotrate.setTitle(`**Thotrate of ${thotvictim.user.username}**`)
                thotrate.setDescription(`You are ${percentage}% thot :joy:`)
                thotrate.setTimestamp()
                thotrate.setImage(thotvictim.user.displayAvatarURL({dynamic: true}))
                message.channel.send(thotrate)
            }
            else{
            thotrate.setTitle(`**Thotrate of ${message.author.username}**`)
            thotrate.setDescription(`You are ${percentage}% a thot :joy:`)
            thotrate.setTimestamp()
            thotrate.setImage(message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(thotrate)
            }  
        }

        else if(command.includes(prefix + 'gayrate') || command.includes(prefix + 'gr')){
            let percentage = Math.floor(Math.random()*100)
            const gayvictim = message.mentions.members.first()
            const gayrate = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            if(gayvictim){
                gayrate.setTitle(`**Gayrate of ${gayvictim.user.username}**`)
                gayrate.setDescription(`You are ${percentage}% gay :rainbow_flag: `)
                gayrate.setTimestamp()
                gayrate.setImage(gayvictim.user.displayAvatarURL({dynamic: true}))
                message.channel.send(gayrate)
            }
            else{
            gayrate.setTitle(`**Gayrate of ${message.author.username}**`)
            gayrate.setDescription(`You are ${percentage}% gay :rainbow_flag: `)
            gayrate.setTimestamp()
            gayrate.setImage(message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(gayrate)
            }  
        }

        else if(message.content.startsWith(prefix + 'blacklist')){
            if(!message.author.id === '376041476917821441') return;
                const listedperson = message.mentions.users.first();
                blacklistDB.set(listedperson.id)
                message.channel.send(`${listedperson} has successfully been blacklisted`);
    
        setTimeout(() => {
            cooldownDB.delete(message.author.id);
        }, cdSeconds * 1000);
        }
    }
})


//figgy token (making it go online)


// client.mongoose.init();
client.login(process.env.token);
require('./server');