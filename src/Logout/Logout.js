import React from 'react';

class Logout extends React.Component {

  render() {
    return (
      <button className='button' id='logout' onClick={this.handleSubmit}>Logout</button>
    )
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.logOut()
    
  }
}

export default Logout;