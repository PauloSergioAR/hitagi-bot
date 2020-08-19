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
    string = "A-aqui vai onii-chan :point_right::point_left:\n"
    callback(string + submission.url)
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

function moan(message) {
  var voiceChannel = message.member.voice.channel;

  voiceChannel.join().then(connection => { 
      const dispatcher = connection.play('../public/yammete.mp3');
      dispatcher.on("end", end => voiceChannel.leave()) 
    })
    .catch(err => console.log(err));
}

module.exports = {
  showBoobs,
  showHentai,
  showYaoi,
  moan
}