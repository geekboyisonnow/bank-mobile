// src/Auth/Auth.js

import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';
export default class Auth {
  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      params: {
        scope: 'openid'
      }
    }
  });
  constructor() {
    this.handleAuthentication();
    // binds functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }
  handleAuthentication() {
    // Add a callback for Lock's `authenticated` event
    this.lock.on('authenticated', this.setSession.bind(this));
    // Add a callback for Lock's `authorization_error` event
    this.lock.on('authorization_error', (err) => {
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
      history.replace('/home');
    });
  }
  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      history.replace('/home');
    }
  }
  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }
  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}


// import history from '../history';
// import auth0 from 'auth0-js';

// export default class Auth {
  
//   accessToken;
//   idToken;
//   expiresAt;

//   // ...
//   auth0 = new auth0.WebAuth({
//     domain: 'ozk.auth0.com',
//     clientID: 'vpFtu6fHWhEX4RQnYpRQu5eYHi6oXCkw',
//     redirectUri: 'http://localhost:3000/home',
//     responseType: 'token id_token',
//     scope: 'openid'
//   });

//   login() {
//     this.auth0.authorize();
//   }

//   constructor() {
//     this.login = this.login.bind(this);
//     this.logout = this.logout.bind(this);
//     this.handleAuthentication = this.handleAuthentication.bind(this);
//     this.isAuthenticated = this.isAuthenticated.bind(this);
//     this.getAccessToken = this.getAccessToken.bind(this);
//     this.getIdToken = this.getIdToken.bind(this);
//     this.renewSession = this.renewSession.bind(this);
//   }

//   handleAuthentication() {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult);
//       } else if (err) {
//         history.replace('/home');
//         console.log(err);
//         alert(`Error: ${err.error}. Check the console for further details.`);
//       }
//     });
//   }

//   getAccessToken() {
//     return this.accessToken;
//   }

//   getIdToken() {
//     return this.idToken;
//   }

//   setSession(authResult) {
//     // Set isLoggedIn flag in localStorage
//     localStorage.setItem('isLoggedIn', 'true');

//     // Set the time that the access token will expire at
//     let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
//     this.accessToken = authResult.accessToken;
//     this.idToken = authResult.idToken;
//     this.expiresAt = expiresAt;

//     // navigate to the home route
//     history.replace('/home');
//   }

//   renewSession() {
//     this.auth0.checkSession({}, (err, authResult) => {
//        if (authResult && authResult.accessToken && authResult.idToken) {
//          this.setSession(authResult);
//        } else if (err) {
//          this.logout();
//          console.log(err);
//          alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
//        }
//     });
//   }

//   logout() {
//     // Remove tokens and expiry time
//     this.accessToken = null;
//     this.idToken = null;
//     this.expiresAt = 0;

//     // Remove isLoggedIn flag from localStorage
//     localStorage.removeItem('isLoggedIn');

//     // navigate to the home route
//     history.replace('/home');
//   }

//   isAuthenticated() {
//     // Check whether the current time is past the
//     // access token's expiry time
//     let expiresAt = this.expiresAt;
//     return new Date().getTime() < expiresAt;
//   }
    
// }

