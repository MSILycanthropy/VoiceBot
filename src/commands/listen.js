const Picovoice = require("@picovoice/picovoice-node");
const prism = require("prism-media");
const chunkArray = require("../utils/convert");
const path = require("path");

exports.run = async (client, message, args) => {
  if (!client.all_queues.get(message.guild.id)) {
    message.channel.send("I am not currently in a voice channel");
    return;
  } else {
    const handle = new Picovoice(
      "./porcupine/wake.ppn",
      wakeCallback,
      "./porcupine/context.rhn",
      inferenceCallback,
      0.7,
      0.5
    );
    const endFrames = new Array(30).fill(new Array(512).fill(0));
    client.all_queues.get(message.guild.id).connection.on("speaking", (user, speaking) => {
      if (!speaking) {
        return;
      }
      if (!speaking.bitfield) {
        //Discord doesnt send silent frames, so when you stop speaking, send a few frames of silence to process.

        for (let frame of endFrames) {
          handle.process(frame);
        }
        return;
      }

      const frameLength = handle.frameLength;
      const stream = client.all_queues.get(message.guild.id).connection.receiver.createStream(user, { mode: "opus" });
      const decoder = new prism.opus.Decoder({ frameSize: 640, channels: 1, rate: 16000 });

      let frameAccumulator = [];
      stream.pipe(decoder);

      decoder.on("data", async (buffer) => {
        let framesInt16 = new Array(buffer.length / 2);
        for (let i = 0; i < buffer.length; i += 2) {
          framesInt16[i / 2] = buffer.readInt16LE(i);
        }

        frameAccumulator = frameAccumulator.concat(framesInt16);

        let frames = chunkArray(frameAccumulator, frameLength);

        if (frames[frames.length - 1].length != frames.length) {
          frameAccumulator = frames.pop();
        } else {
          frameAccumulator = [];
        }

        for (let frame of frames) {
          handle.process(frame);
        }
      });
    });
  }

  function wakeCallback(index) {
    console.log(index);
    console.log(path.join(__dirname, "../sounds/im_zach.mp3"));
    client.all_queues.get(message.guild.id).connection.play(path.join(__dirname, "../../sounds/im_zach.mp3"));
    //TODO: add a little noise to play!
  }

  function inferenceCallback(inference) {
    console.log(inference);
    if (inference.isUnderstood) {
      if (inference.intent == "volume") {
        client.commands.get(inference.intent).run(client, message, inference.slots.volume);
        return;
      }
      client.commands.get(inference.intent).run(client, message, null);
    }
  }
};

exports.config = {
  aliases: [],
};
