import React, {Component} from 'react';

class Navbar extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (<nav className="navbar">
    <span>
      <a href="/" className="navbar-brand">Chatty</a>
      <a className="connections">Users connected: {this.props.number}</a>
      </span>
  </nav>)
  }
}



export default Navbar