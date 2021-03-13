function sendMessage(message, text) {
  message.channel.startTyping();
  message.channel.stopTyping();
  message.channel.send(text);
}

module.exports = sendMessage;
