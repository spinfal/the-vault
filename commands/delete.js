const { Discord, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
//const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const keyName = args.shift();
  
  fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:"GET"}).then(res => res.json()).then(res => {
  delete res[keyName];
  fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:(keyName === 'all') ? "DELETE" : "POST",headers:{"Content-Type": "application/json"},body:JSON.stringify(res)})
  const deletedEmbed = new MessageEmbed()
    .setTitle('Successfully deleted')
    .setDescription(`${(keyName == "all") ? "Your vault has been deleted." : "Your vaule has been deleted."}`);
  if (message.guild !== null) message.delete();
  return message.author.send(deletedEmbed);
  }).catch(e => console.log(e));
}

module.exports.help = {
  name: "delete"
}