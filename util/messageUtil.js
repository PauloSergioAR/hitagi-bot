const fixed_messages = require("../commands/resources/fixed-messages.json");
const redditCommands = require("../commands/resources/reddit-commands.json")
const audioCommands = require("../commands/resources/audio-commands.json")
const puppeteer = require ("puppeteer")
const stringSimilarity = require("string-similarity");
const fs = require('fs')

function sendMessage(message, messageToSend) {
    message.channel.send(messageToSend);
}

async function handleRunas(discordMessage, command){
    let [trash, keyword, champ, role] = command.split(" ")
    if(role == "mid"){
        role = "middle"
    }
    if(role == "sup" || role == "suporte"){
        role = "support"
    }
    if(role == "jg"){
        role = "jungle"
    }
    let commands = command.split(" ")
    console.log(commands)
    let url = "https://www.leagueofgraphs.com/champions/runes/" + champ + "/" + role;
    console.log(url);
    let browser
    (async () => {
        browser = await puppeteer.launch();
        try{
          const page = await browser.newPage();
          page.setViewport({
              width: 1280, height: 3400,
          })
          await page.goto(url);
  
          page.waitForSelector('table.perksTableContainerTable').then(() => {
              
              let index = 0
              page.$$('table.perksTableContainerTable').then(elements => elements.forEach(async (img) => {
                  await img.screenshot({path: "runes" + index + ".png"})
                  await discordMessage.channel.send("", {files: ["runes" + index + ".png"]})
                  fs.unlinkSync("runes" + index + ".png")
                  index++
              }))
              .catch(error => console.log(error))
          })
        } catch (e) {
          console.log(e)
        } finally {
          setTimeout(10000,async () => {
            await browser.close()
          })
        } 
      })()      
}

function handleHelp(discordMessage){
    let message = ""

    message += "Comandos do reddit:\n\n"
    Object.keys(redditCommands.messages).forEach((command) => {
        if(redditCommands.messages[command].description){
            message += command + " -> " + redditCommands.messages[command].description + "\n"
        }
    })

    message += "\nMensagens fixas:\n\n"
    Object.keys(fixed_messages.answers_list).forEach((command) => {
        message += command + "\n"
    })

    message += "\nMensagens de audio:\n\n"
    Object.keys(audioCommands.messages).forEach((command) => {
        if(audioCommands.messages[command].description){
            message += command + " -> " + audioCommands.messages[command].description + "\n"
        }
    })
    sendMessage(discordMessage, message)
}

function checkRedditCommand(message, commandMessage) {

    let matches = stringSimilarity.findBestMatch(commandMessage, Object.keys(redditCommands.messages))
    if (matches.bestMatch.rating > .7) {
        let foo = redditCommands.messages[matches.bestMatch.target]['function'];
        let subreddit = redditCommands.messages[matches.bestMatch.target]['subreddit'];
        let customMessage = redditCommands.messages[matches.bestMatch.target]['customMessage'];

        require('../commands/handle-reddit-command.js')[foo].call(this, message, subreddit, customMessage)
        return true
    }
    return false
}

function checkDefaultMessages(message, messageToSend) {
    let list = fixed_messages.answers_list;
    let foundMessage = false;

    console.log(messageToSend)
    let matches = stringSimilarity.findBestMatch(messageToSend, Object.keys(list));

    if (matches.bestMatch.rating == 1) {
        foundMessage = true;
        sendMessage(message, list[matches.bestMatch.target]);
    }
    return foundMessage;
}

function checkAudioCommand(message, commandMessage){
    let matches = stringSimilarity.findBestMatch(commandMessage, Object.keys(audioCommands.messages))

    if(matches.bestMatch.rating > .7){
        let foo = audioCommands.messages[matches.bestMatch.target]['function'];
        let audioFile = audioCommands.messages[matches.bestMatch.target]['audioFile'];
        let customMessage = audioCommands.messages[matches.bestMatch.target]['customResponse'];

        require('../commands/audioCommands.js')[foo].call(this, message, audioFile, customMessage)
        return true
    }
    return false
}

module.exports = {
    sendMessage,
    checkRedditCommand,
    checkDefaultMessages,
    checkAudioCommand,
    handleHelp,
    handleRunas
}