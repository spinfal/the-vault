const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;
//const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  
  const newPassword = (args.length == 0) ? uuidv4() : args.join(' ');
  const tempLoginCode = uuidv4();
  // pwd to base64
  const pwdBuff = Buffer.from(newPassword, 'utf-8');
  const pwdVal = pwdBuff.toString('base64');
  // temp to base64
  const tempBuff = Buffer.from(tempLoginCode, 'utf-8');
  const tempVal = tempBuff.toString('base64');
  
  let _method = await fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:"GET"});
  
  fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:(await _method.status == 400) ? "POST" : "PUT",headers:{"Content-Type": "application/json"},body:JSON.stringify({'_PASSWORD': pwdVal, 'tempLogin': tempVal})}).then(res => {

    if (_method.status == 400) { console.log(`New user, ${message.author.id}!`); } else { console.log(`The password for ${message.author.id} has been updated!`); }
    const addedEmbed = new MessageEmbed()
      .setTitle('Successfully set password')
      .setDescription(`${(_method.status == 400) ? "Your vault has been made and your" : "Your"} password has been saved.

Your password: ||${newPassword}||
You can quickly login using a temp-login code [here](https://vault.spinfal.repl.co?quickLogin=${tempLoginCode}&user=${message.author.id})`);
    if (message.guild !== null) message.delete();
    return message.author.send(addedEmbed);
  }).catch(e => console.log(e));
}

module.exports.help = {
  name: "setpw"
}