import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: {
      userId: authData.data.localId,
      tokenId: authData.data.idToken,
    },
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

const checkExpiration = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: actionTypes.AUTH_LOGOUT }); // after 1 hour automatically logout the user
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  //claearing the local storage when we logout
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authMain = (email, password, signMethod) => {
  return (dispatch) => {
    dispatch(authStart());
    const authConfig = {
      email: email.value,
      password: password.value,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqFx_0AhHUxmaGujERM6ypffyJ5qPHeD8';
    if (!signMethod) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqFx_0AhHUxmaGujERM6ypffyJ5qPHeD8';
    }
    axios
      .post(url, authConfig)
      .then((response) => {
        console.log(response);
        const expirationTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        ); // storing the expiration date for the token
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response));
        dispatch(checkExpiration(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authStateCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationTime'));
      console.log(expirationTime);
      if (expirationTime < new Date()) {
        dispatch(logout());
      } else {
        const object = {
          data: {
            localId: localStorage.getItem('userId'),
            tokenId: localStorage.getItem('token'),
          },
        };
        dispatch(authSuccess(object));
        dispatch(
          checkExpiration(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
