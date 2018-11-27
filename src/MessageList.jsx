import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <Message message={message} content={message} />
    ));
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;