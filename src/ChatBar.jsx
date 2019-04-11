import React, {Component} from 'react';
const uuidv1 = require('uuid/v1');

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser.name,
      content: ''
    }
    this.messageInput = this.messageInput.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }
  componentDidMount(){
    this.socket = new WebSocket("ws://localhost:3001");
  }
  
  messageInput(event){
    if (event.key === 'Enter'){
      const msg = {content:event.target.value, username: this.state.currentUser, id: uuidv1()};
      this.socket.send(JSON.stringify(msg));
      this.props.addNewMessage(msg)
      event.target.value = ""
    }
  }

  changeUser (event) {
      const newUser = event.target.value;
      this.socket.send(JSON.stringify(newUser));
      this.props.updateUser(newUser)
      return (<div className="message system">
      Anonymous1 changed their name to nomnom.
    </div>)
  }

  render() {
    return (
      <footer className="chatbar">
      <input className="chatbar-username"
      placeholder={this.props.currentUser?this.props.currentUser.name : "Your Name (Optional)"} 
      onBlur = {this.changeUser}/>
      <input className="chatbar-message"
      content = {this.state.content}
      placeholder="Enter message here"
      onKeyPress = {this.messageInput}/>
      </footer>
    );
  }
}
export default ChatBar;
