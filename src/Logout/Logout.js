import React from 'react';

class Logout extends React.Component {

  render() {
    return (
      <button type='Submit' onClick={this.changeLogStatus}>Logout</button>
    )
  }
}

export default Logout;