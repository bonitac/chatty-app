import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser.name,
      content: ''
    }
  }
  componentDidMount(){
  }
  
  render() {
    console.log("inchatbar")
    const socket = new WebSocket("ws://localhost:3001");

    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        // const id = 4
        this.setState({content:event.target.value, username: this.state.currentUser})
        this.props.addNewMessage(this.state)
      }
    }

    const wsKeyUp = (event) => {
      if (event.key === 'Enter'){
        const msg = {content:event.target.value, username: this.state.currentUser};
        socket.send(JSON.stringify(msg))
        event.target.value = ""
      }
    }

    return (
      <footer className="chatbar">
      <input className="chatbar-username"
      placeholder={this.props.currentUser?this.props.currentUser.name : "Your Name (Optional)"} />
      <input className="chatbar-message"
      content = {this.state.content}
      placeholder="Enter message here"
      onKeyPress = {wsKeyUp}/>
      </footer>
    );
  }
}
export default ChatBar;
