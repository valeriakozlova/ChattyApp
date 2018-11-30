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
      if(data.type === "userCount"){
        this.setState({userCount: data.userCount});
      } else if (data.type === "incomingNotification" || data.type === "incomingMessage" || data.type === "incomingImage") {
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      } else if (data.type === "colourAssignment") {
        const user = { 
          name: this.state.currentUser.name,
          colour: data.colour
        };
        this.setState({currentUser: user})
      } else {
        throw new Error("Unknown event type " + data.type)
      }
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.element.scrollIntoView({ behavior: 'smooth' });
  }

  addMessage(content) {
       const newMessage = {
        type: "postMessage",
        username: this.state.currentUser.name,
        colour: this.state.currentUser.colour,
        content
      };
      console.log("this is a new message",newMessage);
      this.socket.send(JSON.stringify(newMessage)); 
  }

  changeUser(userName) {
    const nameChangeNotification = {
      type: "postNotification",
      oldName:this.state.currentUser.name,
      newName: userName
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
        <div ref={element => { this.element = element; }} />
        <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}

export default App;
