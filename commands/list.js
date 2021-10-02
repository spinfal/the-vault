const { Discord, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
//const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;

  fetch(`https://getpantry.cloud/apiv1/pantry/${process.env['APIKEY']}/basket/${message.author.id}`,{method:"GET"}).then(res => res.json()).then(res => {
  const obj = res;
  let list = [];
  for (let [key] of Object.entries(obj)) {
    list.push(key);
  }
  const pwd = list.indexOf('_PASSWORD');
  if (pwd > -1) list.splice(pwd, 1);
  const temp = list.indexOf('tempLogin');
  if (temp > -1) list.splice(temp, 1);
    
  const listEmbed = new MessageEmbed()
    .setTitle('Your Vault')
    .setDescription(list.join('\n'));
  if (message.guild !== null) message.delete();
  return message.author.send(listEmbed);
  }).catch(e => {
    console.log(e);
    const noVal = new MessageEmbed()
      .setTitle('Your Vault')
      .setDescription('Your vault is empty!');
    if (message.guild !== null) message.delete();
    message.author.send(noVal);
  });
}

module.exports.help = {
  name: "list"
}