const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'nodejs',
  clientId: 'g8F80ZI5ZjwAhw',
  clientSecret: 'ftMvmoXx0AkjWK4vYXybfOQcMSQ',
  username: 'paulosar',
  password: 'brthdy0025'
});

function showBoobs(callback) {
  r.getSubreddit('boobs').getRandomSubmission().then(submission => {
    console.log(submission)
    //string = "A-aqui vai onii-chan :point_right::point_left:\n"
    callback(submission.url)
    callback(submission)
  })
}

function showHentai(callback) {
  r.getSubreddit('hentai').getRandomSubmission().then(submission => callback(submission.url))
}

function showYaoi(callback) {
  r.getSubreddit('yaoi').getRandomSubmission().then(submission => {
    string = "E-espero que goste Mary-senpai :flushed: \n"
    callback(string + submission.url)
  })
}

function butt(callback){
  r.getSubreddit('ass').getRandomSubmission().then(submission => {
    //string = "E-espero que goste Mary-senpai :flushed: \n"
    callback(submission.url)
  })
}

function plug(callback){
  r.getSubreddit('buttplug').getRandomSubmission().then(submission => {
    //string = "E-espero que goste Mary-senpai :flushed: \n"
    callback(submission.url)
  })
}

function moan(message) {
  console.log(message.member.voice.channel)
  var voiceChannel = message.member.voice.channel;

  if(voiceChannel){
    message.channel.send("Se prepare onii-chan")
    voiceChannel.join().then(connection => { 
        console.log("playing")
        const dispatcher = connection.play(__dirname + '/yammete.mp3');
        dispatcher.on("finish", end => {
          console.log("ended")
          voiceChannel.leave()
        })
      
      })
      .catch(err => console.log(err));
  } else {
    message.channel.send("Você não esta em nenhum canal de voz imprestavel :rolling_eyes:")
  }
}

module.exports = {
  showBoobs,
  showHentai,
  showYaoi,
  moan,
  butt,
  plug
}
