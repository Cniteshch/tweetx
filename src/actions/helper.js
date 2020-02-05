
import axios from 'axios'
import cookie from 'react-cookie';
import {API_URL} from './'

export const emptyString = ''
export const loadingString = 'Loading...'

export  const buttonValue = (condition, string1, string2) => {
  return condition ? string1 : string2
}

// Get Request
export function getData(action, errorType, isAuthReq, url, dispatch, data) {
    const requestUrl = API_URL + url;
    let headers = {};
  
    if (isAuthReq) {
      headers = {
        headers: {
          Authorization: cookie.load('token')
        }
      };
    }
  
    axios.get(requestUrl, headers)
      .then((response) => {
        dispatch({
          type: action,
          payload: response.data,
          data
        });
  
      })
      .catch((error) => {
       errorHandler(dispatch, error.response, errorType);
      });
  }
  
  
  export function DispatchData(action, value, dispatch) {
    dispatch({
      type: action,
      payload: value,
    });
  }
  
  
  
  // Post Request
  export function postData(action, errorType, isAuthReq, url, dispatch, data) {
    const requestUrl = API_URL + url;
    let headers = {};
    if (isAuthReq) {
      headers = {
        headers: {
          Authorization: cookie.load('token')
        }
      };
    }
  
    axios.post(requestUrl, data, headers)
      .then((response) => {
        dispatch({
          type: action,
          payload: response.data,
          loading: false
        });
  
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, errorType);
      });
  
  }
  
  
  // Delete Request
  export function deleteData(action, errorType, isAuthReq, url, dispatch,title) {
    const requestUrl = API_URL + url;
    let headers = {};
  
    if (isAuthReq) {
      headers = {
        headers: {
          Authorization: cookie.load('token')
        }
      };
    }
  
    axios.delete(requestUrl, headers)
      .then((response) => {
        dispatch({
          type: action,
          payload: response.data,
        });
     
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, errorType);
      });
  }

  // error handler
  export function errorHandler(dispatch, error, type) {
    console.log(type, error)
    let errorMessage = error
    dispatch({
      type,
      payload: errorMessage,
    });
  }