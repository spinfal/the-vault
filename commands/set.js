const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;
//const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  if (args.length < 2) return;
  const keyName = args.shift();
  if (keyName === 'all') {
    const errorEmbed = new MessageEmbed()
      .setTitle(`Error`)
      .setDescription(`The key name "all" cannot be used. Please choose a different key name.`);
    if (message.guild !== null) message.delete();
    return message.channel.send(errorEmbed);
  }
  const buff = Buffer.from(args.join(' '), 'utf-8');
  const value = buff.toString('base64');

let _method = await fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:"GET"});
  
  fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:(await _method.status == 400) ? "POST" : "PUT",headers:{"Content-Type": "application/json"},body:JSON.stringify({[keyName]: value})}).then(res => {
  const addedEmbed = new MessageEmbed()
    .setTitle('Successfully added')
    .setDescription(`${(_method.status == 400) ? "Your vault has been made and your" : "Your"} value has been saved. Run the command \`${prefix}get ${keyName}\``);
  if (message.guild !== null) message.delete();
  return message.author.send(addedEmbed);
  }).catch(e => console.log(e));
}

module.exports.help = {
  name: "set"
}