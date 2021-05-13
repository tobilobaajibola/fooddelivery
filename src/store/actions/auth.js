import * as actionTypes from './types';
import axios from '../../services/axios';
import AsyncStorage from '@react-native-community/async-storage';

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccess = (data) => ({
  type: actionTypes.AUTH_SUCCESS,
  token: data.token,
  user: data.user,
});

const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const login = (data) => async (dispatch) => {
  dispatch(authStart());

  try {
    const response = await axios({
      method: 'post',
      url: '/login',
      data,
    });
    console.log(response.data);
    dispatch(authSuccess(response.data));
    return 'success';
  } catch (e) {
    dispatch(authFail(e.message));
  }
};

export const register = (data) => async (dispatch) => {
  dispatch(authStart());

  try {
    const response = await axios({
      method: 'post',
      url: '/register',
      data,
    });
    console.log(response.data);
    dispatch(authSuccess(response.data));
    return 'success';
  } catch (e) {
    dispatch(authFail(e.message));
  }
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.clear();
  dispatch({
    type: actionTypes.AUTH_LOGOUT,
  });
};
