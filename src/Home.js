// src/App.js

import React, { Component } from 'react';
import './App.css';
// import Auth from './Auth/Auth.js';

class Home extends Component {
  render() {
    return (
      <div>
        <header>
          <span className="bank">Bank</span><span>&#8239;</span><strong>OZK</strong>
        </header>
        <body>
          <main className="main-style">
          <div className="main-font">
          Hey BANK OZK Labs... Here is where all the wonderful Text is going to go and go and go and go.
          </div>
          </main>
        </body>
      </div>
    );
  }
}

export default Home;