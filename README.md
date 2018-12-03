# Chatty App

Chatty  allows users to communicate with each other without having to register accounts. It uses React as well as modern tools for Node including Webpack and Babel. Chatty app allows users to send each other gifs using GIPHYS's API.


## Final Product

![Main view](https://github.com/valeriakozlova/ChattyApp/blob/master/docs/Screen%20Shot%202018-12-03%20at%208.18.36%20AM.png?raw=true)


* When any connected user sends a chat message, all connected users receive and display the message
* When a new user joins/leaves the chat, all connected users are notified
* When any connected user changes their name, all connected users are notified of the name change
* Header will display the count of connected users
* Different users' names are each be coloured differently
* Users can send each other GIFS


## Getting Started

Clone the repo onto your local disk. Run the following commands:

```
npm install
npm start
```

Open the main folder in a new terminal window. Run the following commands:

```
cd chatty_server
npm install
npm start
```
Open http://localhost:3000

## Dependencies

babel-core
babel-loader
babel-preset-es2015
babel-preset-react
babel-preset-stage-0
css-loader
eslint
eslint-plugin-react
node-sass
sass-loader
sockjs-client
style-loader
webpack
webpack-dev-server
react
react-dom
dotenv
express
node-fetch
uuid
ws