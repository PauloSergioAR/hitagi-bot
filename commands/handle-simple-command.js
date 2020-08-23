const config = require("../util/config.json");
const { sendMessage, checkRedditCommand, checkDefaultMessages, checkAudioCommand } = require('../util/messageUtil.js')

async function handleCommand(client, message) {
  let command = message.content.replace(config.prefix, "");

  if (checkDefaultMessages(message, command)) {
    return;
  } else if (checkRedditCommand(message, command)) {
    return
  } else if(checkAudioCommand(message, command)){

  }
  else {
    //TODO: call IA
    sendMessage(message, ":rolling_eyes:"); //emoji
  }
}

module.exports = {
  handleCommand
}