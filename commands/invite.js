const Discord = require('discord.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

module.exports.run = async (client, message) => {
  message.author.send(`Here's my invite: <${config.invite}>`);
  if (message.guild !== null) message.delete();
  return;
}

module.exports.help = {
  name: "invite"
}