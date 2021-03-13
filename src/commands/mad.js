const sendMessage = require("../utils/sendMessage");

let mad_num = 0;

exports.run = async (client, message, args) => {
  sendMessage(message, `Zach has been mad ${mad_num} times`);
  mad_num++;
};

exports.config = {
  aliases: ["jacobcogley", "angry"],
};
