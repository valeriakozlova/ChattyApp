import React, {Component} from 'react';

class ChatBar extends Component {

 handleKeyPress = e => {
    if (e.key === 'Enter') {
      const contentInput = e.target.value;
      this.props.addMessage(contentInput);
      e.target.value = "";
    }
  }

  anotherHandleKeyPress = e => {
    if (e.key === 'Enter') {
      const nameInput = e.target.value;
      this.props.changeUser(nameInput);
    }
  }

  render() {
    return (
      <footer className="chatbar">
          <input onKeyPress={this.anotherHandleKeyPress} className="chatbar-username" defaultValue={this.props.user} />
          <input onKeyPress={this.handleKeyPress} className="chatbar-message" name="content" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
