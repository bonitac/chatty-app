const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let numClient = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  numClient +=1;
  console.log('Client connected', numClient);
  wss.clients.forEach( (client)=> {
      client.send(JSON.stringify(numClient))
  })
  
  ws.on('message', (message)=>{
    console.log("got a new message: ", JSON.parse(message));
    wss.clients.forEach(async (client) => {
      if (client.readyState === ws.OPEN){
        client.send(message); 
      }
    });
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    numClient -= 1;
    console.log('Client disconnected', numClient)
  } );
});