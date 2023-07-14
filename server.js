const express = require('express');
const app = express();
const PORT = 1155;
app.get('/', (req, res) => res.send('OK'))
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));



    //message.guild.emojis.create('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/money-mouth-face_1f911.png', 'moneyface');

//const fs = require('fs');
// const commandsFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
// for(const file of commandsFiles ){
//     const command = require(`./commands/${file}`);
//     console.log(command.name);
//     client.commands.set(command.name, command);
// }