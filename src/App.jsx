import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';




class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.socket = new WebSocket('ws://localhost:3001/');
    this.addMessage = this.addMessage.bind(this);
  }
  
  componentDidMount() {
    this.socket.onopen = function(e) {
      console.log('Connected to: ' + e.currentTarget.url);
    };
    setTimeout(() => {
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
    this.socket.onmessage = function (event) {
      console.log(JSON.parse(event.data));
    }
  }

  addMessage(content) {
    console.log(content)
    const newMessage = {
      username: this.state.currentUser.name,
      content
    };
    console.log(newMessage)
    this.socket.send(JSON.stringify(newMessage)); 


    // const newMessage = {
    //   id: Math.floor(Math.random() * 100),
    //   username: this.state.currentUser.name,
    //   content
    // };
    // const oldList = this.state.messages;
    // const newList = [...oldList, newMessage];
    // this.setState({ messages: newList });
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser.name} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
