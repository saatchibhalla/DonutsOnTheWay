import React, { Component } from 'react';
import UserLocation from '../containers/user_location';

export default class App extends Component {
  render() {
    const insiderTipStyle = {
      color: 'red'
    };
    return (
      <div>
        <h1> <div style={insiderTipStyle}>Insider Tip: </div> On your way to the ClickTime office in San Francisco, if you pick up some
        coffee and donuts it'll help you make a good impression! Let me show you the way.</h1>
        <UserLocation />
      </div>
    );
  }
}
