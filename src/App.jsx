import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      userCount: 1
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
      }
      const messages = this.state.messages.concat(data);
      this.setState({messages: messages});
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
    const user = { name: userName };
    this.setState({currentUser: user})
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} notification/>
        <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}
export default App;
