const { Discord, MessageEmbed } = require('discord.js');
const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const db = new JSONdb(`non-private-vault/${message.author.id}.json`);
  if (db.has('locked')) return;
  const obj = db.JSON();
  let list = [];
  for (let [key] of Object.entries(obj)) {
    list.push(key);
  }

  if (list.length > 0) {
    const listEmbed = new MessageEmbed()
      .setTitle('Your Vault')
      .setDescription(list.join('\n'));
    if (message.guild !== null) message.delete();
    return message.author.send(listEmbed);
  } else {
    const emptyEmbed = new MessageEmbed()
      .setTitle('Your Vault')
      .setDescription('Your vault is empty!');
    if (message.guild !== null) message.delete();
    return message.author.send(emptyEmbed);
  }
}

module.exports.help = {
  name: "list"
}