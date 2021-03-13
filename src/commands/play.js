const music = require("../utils/music.js");
const ytdl = require("ytdl-core");

exports.run = async (client, message, args) => {
  if (!message.member.voice.channel) {
    message.channel.send("You are not in a voice channel!");
    return;
  }

  const vc = message.member.voice.channel;
  const search = args[0];
  const current_server_queue = client.all_queues.get(message.guild.id);

  const song_info = await ytdl.getInfo(search);
  const song = {
    title: song_info.videoDetails.title,
    url: song_info.videoDetails.video_url,
  };

  if (!current_server_queue) {
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

    client.all_queues.set(message.guild.id, queue_info);
    queue_info.songs.push(song);
    queue_info.connection = await vc.join();

    music.play(client, message.guild.id, song);
  } else if (current_server_queue.songs.length == 0) {
    current_server_queue.songs.push(song);
    music.play(client, message.guild.id, song);
  } else {
    current_server_queue.songs.push(song);
    message.channel.send(`Added ${song.title} to the queue`);
  }
};
exports.config = {
  aliases: [],
};
