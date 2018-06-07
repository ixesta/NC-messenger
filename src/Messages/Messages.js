import React from 'react';
import WriteMessage from '../WriteMessage/WriteMessage';
import Display from '../Display/Display';

class Messages extends React.Component {
  render() {

    return (
      <div>
        <WriteMessage userName={this.props.userName} />
        <Display />
      </div>
    )
  }

}
export default Messages;