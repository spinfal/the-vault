const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;
const JSONdb = require('simple-json-db');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
  const db = new JSONdb(`non-private-vault/${message.author.id}.json`);
  if (db.has('locked')) return;

  if (args[0] === "all") {
    const obj = db.JSON();
    for (let [key] of Object.entries(obj)) {
      db.delete(key);
    }

    const completeEmbed = new MessageEmbed()
      .setDescription(`Successfully deleted all values.`);
    if (message.guild !== null) message.delete();
    return message.author.send(completeEmbed);
  }
  
  if (db.has(args[0])) {
    db.delete(args[0]);
  
    const deletedEmbed = new MessageEmbed()
      .setTitle('Successfully deleted')
      .setDescription(`Your value has been deleted. Run the command \`${prefix}list\` to see your vault`);
    if (message.guild !== null) {
      message.delete();
    }
    return message.author.send(deletedEmbed);
  } else {
    const errorEmbed = new MessageEmbed()
      .setTitle(`Error`)
      .setDescription(`The value ${args[0]} was not found.`);
    if (message.guild !== null) message.delete();
    return message.author.send(errorEmbed);
  }
}

module.exports.help = {
  name: "delete"
}