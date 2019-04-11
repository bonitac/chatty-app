import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {loading: true,
      currentUser: {name: "Anonymous"},
    messages: []};
    this.addNewMessage = this.addNewMessage.bind(this)
    this.updateUser = this.updateUser.bind(this)
    // this.messageInput = this.messageInput.bind(this);
    // this.changeUser = this.changeUser.bind(this);
    this.socket = new WebSocket("ws://localhost:3001");
  }
  componentDidMount(){
    console.log("componentDidMount <App />");
    this.setState({loading:false});
    this.socket.onopen = () => {
      console.log("connection open")
    }
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, message];
      this.setState({messages: newMessages})
    }
  }

  changeUser (event) {
      const newUser = event.target.value;
      this.socket.send(JSON.stringify(newUser));
      this.props.updateUser(newUser)
      this.setState({currentUser:newUser})
      this.props.currentUser = newUser;
      return (<div className="message system">
      Anonymous1 changed their name to nomnom.
    </div>)
  }

  addNewMessage (msg){
    const newMessage = {content:msg, username: this.state.currentUser.name, id: uuidv1()};
    console.log(newMessage)
    this.socket.send(JSON.stringify(newMessage))
  }

  updateUser (user){
    const userObj = {name: user};
    this.setState({currentUser: userObj})
  }

  render() {
    if (this.state.loading){
      return <h1>Loading</h1>
    }
    console.log("Rendering")
    return (
      <div> {/*but i want to use fragment*/}
        <MessageList
        addNewMessage={this.addNewMessage}
        currentUser={this.state.currentUser}
        messages={this.state.messages}/>
        <ChatBar
        socket = {this.socket}
        addNewMessage={this.addNewMessage}
        updateUser={this.updateUser}
        currentUser={this.state.changeUser}
        messages={this.state.messages}/>
      </div>
      
    );
  }
}
export default App;
