import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <Message key={message.id} message={message} colour={this.props.colour} />
    ));
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;

