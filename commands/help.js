const { Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const prefix = config.prefix;

module.exports.run = async (client, message) => {
  if (message.author.bot) return;
    const helpEmbed = new MessageEmbed()
      .setTitle('Command List')
      .setDescription(`\`${prefix}help\` - shows this embed
\`${prefix}ping\` - returns the bot's ping and latency
\`${prefix}set <key-name> <the key value>'\` - add a value to your vault
\`${prefix}get <key-name>\` - get a value from your vault
\`${prefix}list\` - list everything in your vault
\`${prefix}delete <key-name>\` *or* \`all\` - delete a value from your vault
\`${prefix}lock\` - lock your vault using a password you provide
\`${prefix}unlock\` - unlock your vault using your password

**__Please do not use this bot to store anything sensitive. Although your values are encoded, this bot is not meant for sensitive content.__**`)
      .setTimestamp();
    return message.channel.send(helpEmbed);
}

module.exports.help = {
  name: "help"
}