const Discord = require("discord.js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.join(__dirname, "../.env") });
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection(); // TODO: Implement this
client.events = new Discord.Collection();
client.all_queues = new Discord.Collection(); // All the queues for all the servers

client.once("ready", () => {
  console.log("Ready!");
});

fs.readdir("./src/events/", (err, files) => {
  if (err) return console.error(err);

  files.forEach((file) => {
    const eventF = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Successfully Loaded ${file} event`);
    client.on(eventName, (...args) => {
      eventF.run(client, ...args);
    });
  });
});

fs.readdir("./src/commands/", (err, files) => {
  if (err) return console.error(err);

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    console.log(`Successfully Loaded ${file} command`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });

  console.log(client.commands.get("mad").config.aliases);
});

client.login(process.env.DISCORD_TOKEN);
