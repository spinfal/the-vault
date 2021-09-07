const { Discord, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
//const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:"GET"}).then(res => res.json()).then(res => {
      const buff = Buffer.from(res[args[0]], 'base64');
      const str = buff.toString('utf-8');
      
      const resEmbed = new MessageEmbed()
        .setTitle(`\`${args[0]}\` value`)
        .setDescription(str);
      if (message.guild !== null) message.delete();
      return message.author.send(resEmbed);
  }).catch(e => {
    const noVal = new MessageEmbed()
      .setTitle(`Error`)
      .setDescription(`Either the key ${args[0]} was not found, or another error has occured.

The error message has been reported to spin.`);
    if (message.guild !== null) message.delete();
    fetch(process.env['WEBHOOK'],{method:"POST",headers:{"Content-Type": "application/json"},body:JSON.stringify({content: `\`\`\`${e}\`\`\``})})
    message.author.send(noVal);
  });
}

/*
const noVal = new MessageEmbed()
        .setTitle(`Error`)
        .setDescription(`The key ${args[0]} was not found.`);
      if (message.guild !== null) message.delete();
      return message.author.send(noVal);
*/

module.exports.help = {
  name: "get"
}