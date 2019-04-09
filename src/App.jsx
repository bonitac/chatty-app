import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  render() {
    return (
      <body>
        {/* <MessageList /> */}
        <Message/>
        <ChatBar />
      </body>
      
    );
  }
}
export default App;
