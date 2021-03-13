const music = require("../utils/music");

exports.run = async (client, message, args) => {
  if (!music.connected(client, message.guild.id)) {
    message.channel.send("I am not in a voice channel!");
  } else {
    //TODO: Add stop
  }
};
exports.config = {
  aliases: [],
};
