import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    }
    this.handleKeyPressMsg = this.handleKeyPressMsg.bind(this);
    this.handleKeyPressUser = this.handleKeyPressUser.bind(this);
  }
  handleKeyPressMsg(event){
    if (event.key === 'Enter'){
      this.props.addNewMessage(event.target.value)
      event.target.value = ""
    }
  }
  handleKeyPressUser(event){
    const newUser = event.target.value;
    if (this.props.currentUser !== newUser){
      this.props.updateUser(newUser)
    }
  }
  render() {
    return (
      <footer className="chatbar">
      <input className="chatbar-username"
      placeholder={this.props.currentUser?this.props.currentUser.name : "Your Name (Optional)"} 
      onBlur = {this.handleKeyPressUser}/>
      <input className="chatbar-message"
      content = {this.state.content}
      placeholder="Enter message here"
      onKeyPress = {this.handleKeyPressMsg}/>
      </footer>
    );
  }
}
export default ChatBar;
