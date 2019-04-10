import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id:2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {loading: true, currentUser: "", messages: ""};
    this.addNewMessage = this.addNewMessage.bind(this)
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({loading:false, currentUser:data.currentUser, messages:data.messages});
    },1000)
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      // const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      // const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    // this.socket = new WebSocket("ws://localhost:3001");
  }

  addNewMessage (message){
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({messages: newMessages})
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
        currentUser={this.state.currentUser}
        messages={this.state.messages}/>
      </div>
      
    );
  }
}
export default App;
