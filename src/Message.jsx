import React, {Component} from 'react';


class Message extends Component {
  render() {

    const style = {
      color: this.props.message.colour
    }

    if (this.props.message.type === "incomingMessage") {
      return (
        <div className="message" >
          <span className="message-username" style={style}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      )
    }

    if (this.props.message.type === "incomingImage") {
      return (
        <div>
        <div className="message" >
          <span className="message-username" style={style}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
        <div className="imageSent">
         <center><img className="image" src={this.props.message.url}  alt={this.props.message.alt}/></center> 
        </div>
      </div>
      )
    }

    return (
    <div className="notification">
      <span className="notification-content"><center>{this.props.message.content}</center></span>
    </div>
    )
  }
}

export default Message;
