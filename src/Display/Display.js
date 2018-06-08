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
    console.log(this.state.messages, 'MESSAGES')
    return (<div>{this.state.messages.sort((a, b) => a.timestamp - b.timestamp).map(((message, id) => <p key={message.id}>{message.text} from {message.userName}</p>))}</div>)
  }


}





export default Display;