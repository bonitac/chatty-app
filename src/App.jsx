import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {loading: true,
      currentUser: {name: "Anonymous"},
    messages: []};
    this.addNewMessage = this.addNewMessage.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }
  componentDidMount(){
    console.log("componentDidMount <App />");
    this.setState({loading:false});
  }

  addNewMessage (message){
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({messages: newMessages})
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
        currentUser={this.state.currentUser}
        messages={this.state.messages}/>
      </div>
      
    );
  }
}
export default App;
