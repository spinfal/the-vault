const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;
const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const db = new JSONdb(`non-private-vault/${message.author.id}.json`);
  if (db.has('locked')) {
    const failedEmbed = new MessageEmbed()
      .setTitle('Error')
      .setDescription(`Your vault is already locked. If you forgot your password, DM spin~#5150`);
    if (message.guild !== null) message.delete();
    return message.author.send(failedEmbed);
  }
  if (args.length === 1) {
    const buff = Buffer.from(args[0], 'utf-8');
    const pswd = buff.toString('base64');
    db.set('password', pswd);
    db.set('locked', true);
    const lockedEmbed = new MessageEmbed()
      .setTitle('Successfully locked')
      .setDescription(`Your vault has been locked. Run the command \`${prefix}unlock <password>\` to unlock it!`);
    if (message.guild !== null) message.delete();
    return message.author.send(lockedEmbed);
  } else {
    const errorEmbed = new MessageEmbed()
      .setTitle('Error')
      .setDescription(`Your password cannot contain any spaces.`);
    if (message.guild !== null) message.delete();
    return message.author.send(errorEmbed);
  }
}

module.exports.help = {
  name: "lock"
}