const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;
const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const db = new JSONdb(`non-private-vault/${message.author.id}.json`);
  if (db.has('locked')) return;
  const keyName = args.shift();
  const buff = Buffer.from(args.join(' '), 'utf-8');
    const value = buff.toString('base64');
  db.set(keyName, value);
  
  const addedEmbed = new MessageEmbed()
    .setTitle('Successfully added')
    .setDescription(`Your value has been saved. Run the command \`${prefix}get ${keyName}\``);
  if (message.guild !== null) message.delete();
  return message.author.send(addedEmbed);
}

module.exports.help = {
  name: "set"
}