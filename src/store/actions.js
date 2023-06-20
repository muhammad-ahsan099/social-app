import {
  SET_USER_INFO,SET_SEARCH_USERS
} from './action-types';

const setUserInfo = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_INFO,
      payload,
    });
  };
};
const setSearchUsers = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_SEARCH_USERS,
      payload,
    });
  };
};
export const ACTIONS = {
  setUserInfo,
  setSearchUsers
};
