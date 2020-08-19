function handlePing(request, response){
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(
    `Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
  );
  response.sendStatus(200);
}

function handleHome(request, response) {
  
  response.sendFile(__dirname + "/public/home.html")
}

module.exports = {
  handlePing,
  handleHome
}

