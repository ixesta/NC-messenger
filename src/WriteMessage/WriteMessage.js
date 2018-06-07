import React from 'react';
import * as api from '../api';
import moment from 'moment';

class WriteMessage extends React.Component {
  state = {
    value: '',
    userName: ''
  }
  render() {
    return (<form>
      <input onChange={this.handleInput} value={this.state.value} />
      <button type='Submit' onClick={this.sendMessage}>Submit your happy message here</button>
    </form>)
  }

  sendMessage = (event) => {
    api.postMessage({
      userName: this.props.userName,
      text: this.state.value,
      timestamp: moment().format()

    }, (error) => error ? alert(error.message) : this.setState({ value: '' }));
  }

  handleInput = (event) => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({ value })
  }


}



export default WriteMessage;