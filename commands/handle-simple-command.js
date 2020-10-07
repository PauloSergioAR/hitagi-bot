const config = require("../util/config.json");
const { sendMessage, checkRedditCommand, checkDefaultMessages, checkAudioCommand, handleHelp } = require('../util/messageUtil.js')

async function handleCommand(client, message) {
  let command = message.content.replace(config.prefix, "").replace(config.prefix2, "");

  if(command.includes("help")){
    handleHelp(message)
    return
  }

  if (checkDefaultMessages(message, command)) {
    return;
  } else if (checkRedditCommand(message, command)) {
    return
  } else if(checkAudioCommand(message, command)){
    return
  }
  else {
    //TODO: call IA
    sendMessage(message, ":rolling_eyes:"); //emoji
  }
}

module.exports = {
  handleCommand
}
