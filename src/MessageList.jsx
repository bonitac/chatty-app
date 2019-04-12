import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  onNewPost (content){
    messages.push(content)
  }

  handleNameChange(event){
    console.log("yes")
  }
  
  render() {
    const messages = this.props.messages.map(message => {
      return <Message
      key = {message.id}
      username = {message.username}
      content = {message.content}
      />
    })
    const notification = ()=>{
      return (<div className="message system">
      Anonymous1 changed their name to nomnom.
      </div>)
    }
    return (
      <main className="messages">
      <script src = {Message}></script>
      {messages}
      {notification}
    </main>
    );
  }
}
export default MessageList;
