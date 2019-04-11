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
    this.props.updateUser(newUser)
    // this.setState({currentUser:newUser})
    // this.props.currentUser = newUser;
  }
  

  // changeUser (event) {
  //     const newUser = event.target.value;
  //     this.socket.send(JSON.stringify(newUser));
  //     this.props.updateUser(newUser)
  //     this.setState({currentUser:newUser})
  //     this.props.currentUser = newUser;
  //     return (<div className="message system">
  //     Anonymous1 changed their name to nomnom.
  //   </div>)
  // }

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
