const {sendMessage} = require("../util/messageUtil.js")

function playAudio(message, audioFile, customResponse){
    var voiceChannel = message.member.voice.channel;

    if(voiceChannel == null){
      sendMessage(message, "Você não ta em nenhum canal de voz seu incopetente")
    }

    sendMessage(message, customResponse)
    voiceChannel.join().then(connection => { 
        console.log("playing")
        const dispatcher = connection.play(__dirname + '/resources/' + audioFile);
        dispatcher.on("finish", end => {
          console.log("ended")
          voiceChannel.leave()
        })
        
      })
      .catch(err => console.log(err));
}

module.exports = { 
    playAudio
}