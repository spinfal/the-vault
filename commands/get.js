const { Discord, MessageEmbed } = require('discord.js');
const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const db = new JSONdb(`non-private-vault/${message.author.id}.json`);
  if (db.has('locked')) return;
  const buff = Buffer.from(db.get(args[0]), 'base64');
    const str = buff.toString('utf-8');
  const val = str;

  if (val !== undefined) {
    const resEmbed = new MessageEmbed()
      .setTitle(`${args[0]} value`)
      .setDescription(val);
    if (message.guild !== null) message.delete();
    return message.author.send(resEmbed);
  } else {
    const noVal = new MessageEmbed()
      .setTitle(`Error`)
      .setDescription(`The key ${args[0]} was not found.`);
    if (message.guild !== null) message.delete();
    return message.author.send(noVal);
  }
}

module.exports.help = {
  name: "get"
}