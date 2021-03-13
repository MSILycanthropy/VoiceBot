const ytdl = require("ytdl-core");

// TODO: Implement try catch in this
function play(client, id) {
  const song = client.all_queues.get(id).songs[0];
  const stream = ytdl(song.url, { filter: "audioonly" });
  const vc = client.all_queues.get(id).voice_channel;
  const dispatcher = client.all_queues.get(id).connection.play(stream); // TODO: add changing volume and options
  client.all_queues.get(id).dispatcher = dispatcher;
  client.all_queues.get(id).text_channel.send(`Playing ${song.title}`);

  dispatcher.setVolume(client.all_queues.get(id).volume);
  dispatcher.on("finish", () => {
    client.all_queues.get(id).songs.shift();
    if (client.all_queues.get(id).songs.length == 0) {
      client.all_queues.delete(id);
      vc.leave();
    } else {
      play(client, id);
    }
  });
}

function pause(client, id) {
  client.all_queues.get(id).dispatcher.pause();
}

function resume(client, id) {
  client.all_queues.get(id).dispatcher.resume();
}

function skip(client, id) {
  const vc = client.all_queues.get(id).voice_channel;
  client.all_queues.get(id).dispatcher.pause();
  client.all_queues.get(id).songs.shift();
  if (client.all_queues.get(id).songs.length == 0) {
    client.all_queues.delete(id);
    vc.leave();
  } else {
    play(client, id);
  }
}

function volume(client, id, volume) {
  client.all_queues.get(id).volume = volume;
  if (client.all_queues.get(id).dispatcher) {
    client.all_queues.get(id).dispatcher.setVolume(volume);
  }
}

function connected(client, id) {
  if (!client.all_queues.get(id)) {
    return false;
  } else if (!client.all_queues.get(id).connection) {
    return false;
  } else {
    return true;
  }
}

module.exports.play = play;
module.exports.pause = pause;
module.exports.resume = resume;
module.exports.skip = skip;
module.exports.volume = volume;
module.exports.connected = connected;
