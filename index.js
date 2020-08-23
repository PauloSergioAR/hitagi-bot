require('dotenv').config()

const express = require("express")
const app = express()
const router = express.Router()


const Discord = require("discord.js")

const {handlePing, handleHome} = require("./util/ping.js")
const {handleCommand} = require("./commands/handle-simple-command.js")

router.get("/", handlePing)
router.get("/about", handleHome)

app.use('/', router)
app.listen(process.env.PORT);

Discord.js
const client = new Discord.Client()
const config = require("./util/config.json")

client.login(process.env.TOKEN)

client.on("message", async message => {
  if (message.author.bot) return
  if (message.channel.type === "dm") return

  try {
    if (message.content.startsWith(config.prefix)) {
      return handleCommand(client, message)
    }
  } catch (err) {
    console.error("Erro:" + err)
  }
});
