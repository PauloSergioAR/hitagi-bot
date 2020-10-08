const config = require("../util/config.json");
const { sendMessage, checkRedditCommand, checkDefaultMessages, checkAudioCommand, handleHelp, handleRunas } = require('../util/messageUtil.js')

async function handleCommand(client, message) {
  let command = message.content.replace(config.prefix, "").replace(config.prefix2, "");

  if(command.includes("help")){
    handleHelp(message)
    return
  }

  if(command.includes("runas")){
    handleRunas(message, command)
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
