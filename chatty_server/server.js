const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config();

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(ws) {
        ws.send(JSON.stringify(data));
    });
  };

const userCount = { type: "userCount" };

// code source: https://stackoverflow.com/questions/1484506/random-color-generator/47231960
// generates random bright vibrant colours
function generateColor() {
    ranges = [
        [150,256],
        [0, 190],
        [0, 30]
    ];
    const g = function() {
        const range = ranges.splice(Math.floor(Math.random()*ranges.length), 1)[0];
        return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
    }
    return "rgb(" + g() + "," + g() + "," + g() +")";
};

wss.on('connection', (ws) => {
    
    console.log('Client connected');
    
    let clientName = "Anonymous";
    const userJoined = {
       type: "incomingNotification",
       content: "Anonymous has joined the chat",
       id: uuidv4()
   };
   wss.broadcast(userJoined);

    const colour = {
        type: "colourAssignment",
        colour: generateColor()
    }
    ws.send(JSON.stringify(colour));

    userCount.userCount = wss.clients.size;
    wss.broadcast(userCount);

    ws.on('message', function (event) {
        let data = JSON.parse(event);
        if (data.type === "postMessage") {
            data.id = uuidv4();
            const giphyTag = data.content.match(/^\/giphy (.+)/);
            if(giphyTag){
                const qs = querystring.stringify({
                    api_key: process.env.API_KEY,
                    tag: giphyTag[1]
                  })
                fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
                                    .then( resp => resp.json())
                                    .then( json => {
                                        data.content = giphyTag[0];
                                        data.url = json.data.images.original.url;
                                        data.alt = giphyTag[1];
                                        data.type = "incomingImage";
                                        wss.broadcast(data);
                                    })
            } else {
                data.type = "incomingMessage";
                wss.broadcast(data);  
            }
        } else if (data.type === "postNotification") {
            data.id = uuidv4();
            data.type = "incomingNotification";
            data.content = `${data.oldName} has changed their name to ${data.newName}`;
            clientName = data.newName;
            wss.broadcast(data);  
        } else {
            throw new Error("Unknown event type " + data.type);
        }
    })

    ws.on('close', function () {
        console.log('Client disconnected');

        userCount.userCount = wss.clients.size;
        wss.broadcast(userCount);

        const clientDisconnected = {
            type: "incomingNotification",
            id: uuidv4(),
            content: `${clientName} left the chat`
        };
        wss.broadcast(clientDisconnected);

    });
});