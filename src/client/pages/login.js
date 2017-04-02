import React, { Component } from 'react';
import { css } from 'glamor';
import GoogleLogin from 'react-google-login';
import Paper from 'material-ui/Paper';

import { PRIMARY, WHITE, LIGHTER_GOOGLE_RED, GOOGLE_RED } from '../palette';

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
      <div { ...styles.container }>
        <div { ...styles.title }>
          Cooks
        </div>
        <Paper style={ styles.paper }>
          <GoogleLogin
            buttonText="Login with Google"
            className={ styles.loginButton }
            clientId={ process.env.GOOGLE_CLIENT_ID }
            onFailure={ this.onFailure }
            onSuccess={ this.onSuccess }
          />
        </Paper>
      </div>
    );
  }
}

const SHADOW = 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px';

const styles = {
  container: css({
    width: '100%',
    height: '100vh',
    backgroundColor: PRIMARY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),
  loginButton: css({
    boxShadow: SHADOW,
    backgroundColor: GOOGLE_RED,
    padding: '0.5em 1em',
    borderRadius: '2px',
    border: '0em solid transparent',
    color: WHITE,
    fontWeight: 100,
    fontSize: '1.25em',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: LIGHTER_GOOGLE_RED,
    },
  }),
  title: css({
    fontSize: '5em',
    fontWeight: 100,
    color: WHITE,
    paddingBottom: '0.5em',
    textShadow: SHADOW,
  }),
  paper: {
    width: '33%',
    height: '30vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
