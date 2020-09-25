const fixed_messages = require("../commands/resources/fixed-messages.json");
const redditCommands = require("../commands/resources/reddit-commands.json")
const audioCommands = require("../commands/resources/audio-commands.json")
const stringSimilarity = require("string-similarity");

function sendMessage(message, messageToSend) {
    message.channel.send(messageToSend);
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
    checkAudioCommand
}