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
    this.socket = new WebSocket("ws://localhost:3001");
  }
  componentDidMount(){
    console.log("componentDidMount <App />");
    this.setState({loading:false});
    this.socket.onopen = () => {
      console.log("connection open")
    }
    this.socket.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data)
      switch(data.type) {
        case "incomingNotification":
        console.log("incomign notif")
        case "postNotification":
        console.log("post notification")

        break;
        case "postMessage":
        case "incomingMessage":
          const oldMessages = this.state.messages;
          const newMessages = [...oldMessages, data];
          this.setState({messages: newMessages})
          break;
        default:
          throw new Error ("Unknown event type " + data.type);
      }
    }
  }

  addNewMessage (msg){
    const newMessage = {type: "incomingMessage",content:msg, username: this.state.currentUser.name, id: uuidv1()};
    console.log(newMessage)
    this.socket.send(JSON.stringify(newMessage))
  }

  updateUser (user){
    const userObj = {name: user};
    this.setState({currentUser: userObj})
    this.socket.send(JSON.stringify({type:"incomingNotification"}))
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
        messages={this.state.messages}/>
      </div>
      
    );
  }
}
export default App;
