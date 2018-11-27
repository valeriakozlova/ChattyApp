import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <Message key={message.id} message={message} />
    ));
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;


// <div className="message system">
// Anonymous1 changed their name to nomnom.
// </div>
// </div>