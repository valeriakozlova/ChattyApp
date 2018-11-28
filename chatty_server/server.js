const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(ws) {
        ws.send(JSON.stringify(data));
    });
  };

function pickColour () {
    const colours = ["magenta","red","blue","green"];
    const colour = colours[Math.floor(Math.random() * 4)]
    return colour;
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    
    const colour = {
        type: "colourAssignment",
        colour: pickColour()
    }
    ws.send(JSON.stringify(colour));

    const userCount = {
        type: "userCount",
        userCount: wss.clients.size
    };
    wss.broadcast(userCount);

    ws.on('message', function (event) {
        let data = JSON.parse(event);
        switch(data.type) {
            case "postMessage":
                data.id = uuidv4();
                data.type = "incomingMessage";
                break;
            case "postImage":
                data.id = uuidv4();
                data.type = "incomingImage";
                break;
            case "postNotification":
                data.id = uuidv4();
                data.type = "incomingNotification";
                break;
            default:
            throw new Error("Unknown event type " + data.type);
        }
        console.log(data)
        wss.broadcast(data);
        console.log(JSON.stringify(data));
})

    ws.on('close', function () {
        console.log('Client disconnected');
        const userCount = {
            type: "userCount",
            userCount: wss.clients.size
        };
        wss.broadcast(userCount);
        console.log(wss.clients.size);
        console.log(userCount);

    });
});