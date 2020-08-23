const express = require("express");
const app = express();
const router = express.Router()
const Discord = require("discord.js"); //Conexão com a livraria 

const {handlePing, handleHome} = require("./ping.js")
const {handleCommand} = require("./commands/handle-simple-command.js")
const {logPost} = require('./commands/handle-reddit-command.js')

router.get("/", handlePing);
router.get("/about", handleHome)
router.get("/reddit", (req, res) => showBoobs())

app.use('/', router)
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.login(""); //Ligando o Bot caso ele consiga acessar o token

client.on("message", async message => {
  console.log(message.content)
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  try {
    if (message.content.startsWith(config.prefix)) {
      console.log("prefixo ok")
      return handleCommand(client, message);
    }
  } catch (err) {
    console.error("Erro:" + err);
  }
});
