import React from 'react';
import * as api from '../api';



class Display extends React.Component {
  state = {
    messages: []
  }

  componentDidMount = () => {
    api.listenForNewMessages(newMessages => {
      this.setState({
        messages: [...this.state.messages, ...newMessages]
      })
    });
  }
  render() {
    return (<div>{this.state.messages.map(message => <p>{message.text}</p>)}</div>)
  }


}





export default Display;