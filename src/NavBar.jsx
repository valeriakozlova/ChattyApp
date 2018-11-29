import React, {Component} from 'react';

class NavBar extends Component {

  render() {

    let user = "users";

    if (this.props.count === 1) {
      user = "user";

      return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty App</a>
        <div className="user-count">{this.props.count} {user} online</div>
        </nav>
    );
    }

    return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty App</a>
        <div className="user-count">{this.props.count} {user} online</div>
        </nav>
    );
  }
}
export default NavBar;

