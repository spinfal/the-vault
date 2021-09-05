const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;
const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const db = new JSONdb(`non-private-vault/${message.author.id}.json`);
  if (!db.has('locked')) {
    const failedEmbed = new MessageEmbed()
      .setTitle('Error')
      .setDescription(`Your vault is not currently locked.`);
    if (message.guild !== null) message.delete();
    return message.author.send(failedEmbed);
  }
  if (args.length === 1) {
    const buff = Buffer.from(db.get('password'), 'base64');
    const str = buff.toString('utf-8');
    if (str === args[0]) {
      db.delete('password');
      db.delete('locked');
      const unlockedEmbed = new MessageEmbed()
        .setTitle('Successfully unlocked')
        .setDescription(`Your vault has been locked!`);
      if (message.guild !== null) message.delete();
      return message.author.send(unlockedEmbed);
    } else {
      const errorEmbed = new MessageEmbed()
        .setTitle('Error')
        .setDescription(`Your password was incorrect. If you forgot your password, DM spin~#5150`);
      if (message.guild !== null) message.delete();
      return message.author.send(errorEmbed);
    }
  }
}

module.exports.help = {
  name: "unlock"
}