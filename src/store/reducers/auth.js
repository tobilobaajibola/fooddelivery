import {updateObject} from '../../utils/index';
import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
  loading: false,
  token: null,
  user: null,
};

const authStart = (state) => updateObject(state, {error: null, loading: true});

const authSuccess = (state, action) =>
  updateObject(state, {
    error: null,
    loading: false,
    token: action.token,
    user: action.user,
  });

const authFail = (state, action) =>
  updateObject(state, {
    error: action.error,
    loading: false,
    token: null,
    user: null,
  });

const authLogout = (state) =>
  updateObject(state, {token: null, user: null, error: null});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    default:
      return state;
  }
};

export default authReducer;
