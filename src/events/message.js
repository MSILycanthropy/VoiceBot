const prefix = "zach ";

exports.run = async (client, message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    let messageContent = message.content.replace(prefix, "");
    let command = messageContent.split(" ")[0];
    console.log(command);
    let args = messageContent.split(" ").slice(1);
    let commandFile =
      client.commands.get(command) ||
      client.commands.find((cmd) => cmd.config.aliases && cmd.config.aliases.includes(command));
    if (!commandFile) return;
    commandFile.run(client, message, args);
  }
};
