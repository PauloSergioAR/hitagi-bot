const { sendMessage } = require("../util/messageUtil.js")
const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'nodejs',
  clientId: 'g8F80ZI5ZjwAhw',
  clientSecret: 'ftMvmoXx0AkjWK4vYXybfOQcMSQ',
  username: 'paulosar',
  password: 'brthdy0025'
});

function getReddit(message, subreddit, customMessage) {
  r.getSubreddit(subreddit).getRandomSubmission().then(submission => {
    sendMessage(message, customMessage + submission.url)
  })
}

module.exports = {
  getReddit
}
