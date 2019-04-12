import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  renderFunction (messages){
    let msgs = this.props.messages.map(message => {
      if (message.type === 'incomingNotification' || message.type ==='postNotification'){
        return (<div className="message system">
           {message.content}
          </div>)
        
      } else {
        console.log("message")
        return <Message
        key = {message.id}
        username = {message.username}
        content = {message.content}
        />
      }
    })
      return msgs;
  }

  render() {
    return (
      <main className="messages">
      <script src = {Message}></script>
      {this.renderFunction(this.props.messages)}
    </main>
    );
  }
}
export default MessageList;
