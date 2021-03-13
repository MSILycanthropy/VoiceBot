exports.run = async (client, message, args) => {
  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    queue_info = {
      text_channel: message.channel,
      voice_channel: message.member.voice.channel,
      connection: null,
      dispatcher: null,
      songs: [],
      audio_streams: new Map(),
      volume: 0.5,
      playing: true,
    };

    queue_info.connection = connection;

    client.all_queues.set(message.guild.id, queue_info);

    message.channel.send(`Joining your voice channel, ${message.author.username}`);
  } else {
    message.channel.send("You are not in a voice channel!");
  }
};
exports.config = {
  aliases: ["connect"],
};
