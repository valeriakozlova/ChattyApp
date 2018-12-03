import React, {Component} from 'react';

class ChatBar extends Component {

  sendMessage = e => {
    if (e.key === 'Enter') {
      const contentInput = e.target.value;
      this.props.addMessage(contentInput);
      e.target.value = "";
    }
  }

  updateName = e => {
    const nameInput = e.target.value;
    //hecks if the user name is indeed different from the current one
    if (!(this.props.user === nameInput)){
      if (e.key === 'Enter') {
        this.props.changeUserName(nameInput);
      }
    }
  }

  render() {
    return (
      <footer className="chatbar">
          <input onKeyPress={this.updateName} className="chatbar-username" defaultValue={this.props.user} />
          <input onKeyPress={this.sendMessage} className="chatbar-message" name="content" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
