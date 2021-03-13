const music = require("../utils/music");

exports.run = async (client, message, args) => {
  if (!music.connected(client, message.guild.id)) {
    message.channel.send("I am not in a voice channel!");
  } else if (!client.all_queues.get(message.guild.id).dispatcher) {
    message.channel.send("I am not playing a song!");
  } else if (client.all_queues.get(message.guild.id).dispatcher.paused) {
    message.channel.send("Song is already paused!");
  } else {
    music.pause(client, message.guild.id);
  }
};
exports.config = {
  aliases: [],
};
