import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        name: "Anonymous",
        colour: "black" 
      },
      messages: [],
      userCount: 0
    };
    this.socket = new WebSocket('ws://localhost:3001/');
    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  
  componentDidMount() {
    this.socket.onopen = function(event) {
      console.log('Connected to: ' + event.currentTarget.url);
    };

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log("checking get", data)

      if(data.type === "userCount"){
        const userCount = data.userCount;
        this.setState({userCount: userCount});
        console.log("user count", data)
      } else if (data.type === "incomingNotification" || data.type === "incomingMessage" || data.type === "incomingImage") {
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
        console.log("incoming", data)
      } else if (data.type === "colourAssignment") {
        console.log("colourAssignment", data)
        const user = { 
          name: this.state.currentUser.name,
          colour: data.colour
        };
        this.setState({currentUser: user})
      }
    }
  }

  addMessage(content) {
    const patt = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    if (patt.test(content)) {
      const newMessage = {
        type: "postImage",
        username: this.state.currentUser.name,
        colour: this.state.currentUser.colour,
        content
      };
      this.socket.send(JSON.stringify(newMessage)); 
    } else {
       const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        colour: this.state.currentUser.colour,
        content
      };
      this.socket.send(JSON.stringify(newMessage)); 
    }
  }

  changeUser(userName) {
    const nameChangeNotification = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has changed their name to ${userName}.`
    }
    this.socket.send(JSON.stringify(nameChangeNotification)); 
    const user = { 
      name: userName,
      colour: this.state.currentUser.colour
    };
    this.setState({currentUser: user})
  }

  render() {
    return (
      <div>
        <NavBar count={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}
export default App;
