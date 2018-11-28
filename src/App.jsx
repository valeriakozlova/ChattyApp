import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {
        name: "Bob",
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
        const userCount = data.userCount;
        this.setState({userCount: userCount});
      } else if (data.type === "incomingNotification" || "incomingMessage") {
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      }
    }
  }

  addMessage(content) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content
    };
    this.socket.send(JSON.stringify(newMessage)); 
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
        <MessageList messages={this.state.messages} colour={this.state.currentUser.colour} notification/>
        <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}
export default App;
