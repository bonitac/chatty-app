import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';

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
    this.socket.onmessage = (event) => {
      if (parseInt(event.data)){
        console.log("here", event.data);
        this.setState({number:parseInt(event.data)})
      }
      const message = JSON.parse(event.data)
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, message];
      this.setState({messages: newMessages})
    }
  }

  addNewMessage (msg){
    const newMessage = {type:"incomingMessage",content:msg, username: this.state.currentUser.name, id: uuidv1()};
    console.log(newMessage)
    this.socket.send(JSON.stringify(newMessage))
  }

  updateUser (user){
    const userObj = {name: user};
    const notif = {type:"incomingNotification", currentUser: userObj, content:`${this.state.currentUser.name} changed their name to ${user}.`, id:uuidv1()}
    this.setState(notif)
    this.socket.send(JSON.stringify(notif))
  }

  render() {
    if (this.state.loading){
      return <h1>Loading</h1>
    }
    console.log("Rendering")
    return (
      <div> {/*but i want to use fragment*/}
        <Navbar number={this.state.number} />
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