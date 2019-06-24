import React, { Component } from 'react';
import AlertMessagesList from './AlertMessagesList';

class Home extends Component {
  render() {
    return (
      <>
        <AlertMessagesList />
        <h1>Home</h1>
      </>
    )
  }
}

export default Home;