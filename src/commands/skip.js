const music = require("../utils/music");

exports.run = async (client, message, args) => {
  if (!music.connected(client, message.guild.id)) {
    message.channel.send("I am not in a voice channel!");
  } else if (!client.all_queues.get(message.guild.id).dispatcher) {
    message.channel.send("I am not playing a song!");
  } else {
    music.skip(client, message.guild.id);
  }
};
exports.config = {
  aliases: [],
};
