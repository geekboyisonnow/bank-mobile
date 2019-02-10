// src/Callback/Callback.js

import React, { Component } from 'react';
import loading from './loading.svg';
import Home from '../Home';

class Callback extends Component {
  render() {
    const style = //...

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;