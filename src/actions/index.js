import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  NEW_POST,
  FETCH_USER_DATA,
  GET_MY_POST,
  POST_ERROR,
  GET_POST,
  GET_USERS,
  USERS_ERROR,
} from './types'
import _ from 'lodash'
import {getData, postData, errorHandler} from './helper'
import cookie from 'react-cookie';
export const API_DOMAIN = 'https://tweetxx.herokuapp.com';
export const CLIENT_ROOT_URL = 'http://localhost:3000/';
export const API_URL = `${API_DOMAIN}/api`;


export function registerUser({
  email,
  name,
  password
}, history) {
  return function (dispatch) {
    email = email.toLowerCase();
    axios.post(`${API_URL}/auth/register`, {
        email,
        name,
        password
      })
      .then((response) => {
        dispatch({
          type: AUTH_USER
        });
        cookie.save('token', response.data.token, {
          path: '/'
        });
        cookie.save('user', response.data.user, {
          path: '/'
        });

        history.push({
          pathname: '/feeds',
          state: {
            registered: true
          }
        })
      })
      .catch(err => {
        errorHandler(dispatch, err.response.data, AUTH_ERROR);
      });


  };
}
export function loginUser({
  email,
  password
}, history) {
  return function (dispatch) {
    email = email.toLowerCase()
    axios.post(`${API_URL}/auth/login`, {
        email,
        password
      })
      .then((response) => {
        cookie.save('token', response.data.token, {
          path: '/'
        });
        cookie.save('user', response.data.user, {
          path: '/'
        });
        dispatch({
          type: AUTH_USER
        });
        history.push({
          pathname: '/feeds',
          state: {
            login: true
          }
        })
      })
      .catch((error) => {
        console.log(error.response, 'error')
        errorHandler(dispatch, error.response.data, AUTH_ERROR);
      });
  };
}

export function newPost(post) {
  return function (dispatch) {
    var queryBody = {
      message: post
    }
    const url = '/post/new'
    postData(NEW_POST, POST_ERROR, true, url, dispatch, queryBody);
  };
}

export function getPosts() {
  return function (dispatch) {
    const url = '/post/all'
    getData(GET_POST, POST_ERROR, true, url, dispatch);
  };
}

export function getMyPosts() {
  return function (dispatch) {
    const url = '/post/my-posts'
    getData(GET_MY_POST, POST_ERROR, true, url, dispatch);
  };
}

export function getUsers() {
  return function (dispatch) {
    const url = '/user/all'
    getData(GET_USERS, USERS_ERROR, true, url, dispatch);
  };
}

export function getMyInfo() {
  return function (dispatch) {
    const url = '/user/profile'
    getData(FETCH_USER_DATA, USERS_ERROR, true, url, dispatch);
  };
}





export function logoutUser(error) {
  return function (dispatch) {

    if (window.location.href === `${CLIENT_ROOT_URL}/login`) {
      error = 'Invalid Email/Password Combination'
    }
    dispatch({
      type: UNAUTH_USER,
      payload: error || ''
    });
    cookie.remove('token', {
      path: '/'
    });
    cookie.remove('user', {
      path: '/'
    });

    if (window.location.href !== `${CLIENT_ROOT_URL}`) {
      window.location.href = `${CLIENT_ROOT_URL}`;
    }


  };
}

