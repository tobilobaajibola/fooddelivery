import {updateObject} from '../../utils/index';
import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
  loading: false,
  products: null,
};

const getProductsStart = (state) =>
  updateObject(state, {error: null, loading: true});

const getProductsSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    products: action.data,
  });

const getProductsFail = (state, action) =>
  updateObject(state, {
    error: action.error,
    loading: false,
  });

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_START:
      return getProductsStart(state);
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return getProductsSuccess(state, action);
    case actionTypes.GET_PRODUCTS_FAIL:
      return getProductsFail(state, action);
    default:
      return state;
  }
};

export default productReducer;
