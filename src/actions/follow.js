import {
    FOLLOW,
    UNFOLLOW,
    FOLLOW_ERROR
  } from './types'
  import {deleteData, postData} from './helper'

  export function follow(id) {
    return function (dispatch) {
      const url = `/follow/${id}`
      const queryBody = {}
      postData(FOLLOW, FOLLOW_ERROR, true, url, dispatch,queryBody);
    };
  }

  export function unfollow(id) {
    return function (dispatch) {
      const url = `/follow/${id}`
      deleteData(UNFOLLOW, FOLLOW_ERROR, true, url, dispatch);
    };
  }