import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

const url = 'http://localhost:3000/auth/google';

export default class Login extends Component {
  onFailure = (response) => {
    console.warn(response.error);
  }

  onSuccess = (response) => {
    fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: response.tokenId,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((token) => {
      this.props.setToken(token);
    }).catch(e => console.warn(e));
  }

  render() {
    return (
      <GoogleLogin
        buttonText="Login with Google"
        clientId={ process.env.GOOGLE_CLIENT_ID }
        onFailure={ this.onFailure }
        onSuccess={ this.onSuccess }
      />
    );
  }
}
