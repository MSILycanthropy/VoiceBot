// For some reason this actually doesn't work, and makes the bot say it is eternally typing
function sendMessage(message, text) {
  message.channel.startTyping();
  message.channel.stopTyping();
  message.channel.send(text);
}

module.exports = sendMessage;
