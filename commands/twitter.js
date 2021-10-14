const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
//const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  
  const twitterHandle = args[0].replace(/@/g, '');
  const buff = Buffer.from(twitterHandle, 'utf-8');
  const value = buff.toString('base64');
  
  let _method = await fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:"GET"});
  
  fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:(await _method.status == 400) ? "POST" : "PUT",headers:{"Content-Type": "application/json"},body:JSON.stringify({'_TWITTER': value})}).then(res => {

    const addedEmbed = new MessageEmbed()
      .setTitle('Successfully set Twitter handle')
      .setDescription(`${(_method.status == 400) ? "Your vault has been made and your" : "Your"} Twitter handle has been saved.

Your handle: ${twitterHandle}
You can save Tweets to your Vault by commenting \`@spinfal\` on the Tweet you wish to save.`);
    if (message.guild !== null) message.delete();
    return message.author.send(addedEmbed);
  }).catch(e => console.log(e));
}

module.exports.help = {
  name: "twitter"
}