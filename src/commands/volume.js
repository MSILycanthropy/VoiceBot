const music = require("../utils/music");

exports.run = async (client, message, args) => {
  if (!music.connected(client, message.guild.id)) {
    message.channel.send("I am not in a voice channel!");
  } else {
    let volume = args[0];
    let isPercent = false;
    if (args[0].slice(-1) == "%") {
      volume = volume.replace("%", "");
      isPercent = true;
    }
    if (isNaN(Number(volume))) {
      message.channel.send("Please only use numbers or percentages to determine the volume!");
      return;
    } else {
      volume = Number(volume);
    }
    if (volume > 1 && !isPercent) {
      message.channel.send("Please only use volumes between 0 and 1 (0 and 100%)!");
      return;
    } else if (isPercent && volume / 100 > 1) {
      message.channel.send("Please only use volumes between 0 and 1 (0 and 100%)!");
      return;
    }

    if (isPercent) {
      volume = volume / 100;
    }
    await message.sen;
    music.volume(client, message.guild.id, volume);
  }
};
exports.config = {
  aliases: [],
};
