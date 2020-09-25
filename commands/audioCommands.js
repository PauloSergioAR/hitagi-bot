const {sendMessage} = require("../util/messageUtil.js")

function playAudio(message, audioFile, customResponse){
    var voiceChannel = message.member.voice.channel;

    if(voiceChannel == null){
      sendMessage(message, "Você não ta em nenhum canal de voz seu incopetente")
      return
    }

    sendMessage(message, customResponse)
    voiceChannel.join().then(connection => { 
        const dispatcher = connection.play(__dirname + '/resources/audioFiles/' + audioFile);
        dispatcher.on("finish", end => {
          voiceChannel.leave()
        })
        
      })
      .catch(err => console.log(err));
}

module.exports = { 
    playAudio
}