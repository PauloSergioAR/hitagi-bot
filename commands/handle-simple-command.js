const Discord = require("discord.js");
const config = require("../config.json");
const fixed_messages = require("../fixed-messages.json");
const commands = require("../command-messages.json")
const stringSimilarity = require("string-similarity");

async function handleCommand(client, message) {
  let command = message.content.replace(config.prefix, "");
  command = command.replace(config.prefix2, "");
  console.log(config)
  console.log(command)
  if (checkDefaultMessages(command)) {
    return;
  } else if (checkCommandMessages(command)) {
    return
  }
  else {
    //TODO: call IA 
    let rand = Math.floor(Math.random() * 2);
    if (rand == 0) {
      sendMessage(":rolling_eyes:"); //emoji
    }
    else {
      sendMessage(":face_with_monocle:"); //emoji
    }
  }
  function sendMessage(messageToSend) {
    message.channel.send(messageToSend);
  }

  function checkCommandMessages(commandMessage) {
    
    let matches = stringSimilarity.findBestMatch(commandMessage, Object.keys(commands.messages))
    console.log(matches.bestMatch.rating)
    if (matches.bestMatch.rating > .7) {
      if(commands.messages[matches.bestMatch.target].includes("moan")){
        console.log("moaning")
        require('./handle-reddit-command.js')["moan"].call(this, message)
//        sendMessage("Se prepare onii-chan")
      } else {
	console.log("sending reddit command")
        res = require('./handle-reddit-command.js')[commands.messages[matches.bestMatch.target]].call(this, (response) => {
          sendMessage(response)
        })
      }
      return true
    }
    return false
  }

  function checkDefaultMessages(messageToSend) {
    let list = fixed_messages.answers_list;
    let foundMessage = false;

    let matches = stringSimilarity.findBestMatch(messageToSend, Object.keys(list));

    if (matches.bestMatch.rating == 1) {
      foundMessage = true;
      sendMessage(list[matches.bestMatch.target]);
    }
    return foundMessage;
  }
}

module.exports = {
  handleCommand
}
