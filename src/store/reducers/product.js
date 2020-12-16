import {updateObject} from '../../utils/index';
import * as actionTypes from '../actions/types';

const initialState = {
  error: null,
  loadingProducts: false,
  loadingCategories: false,
  products: null,
  categories: null,
};

const getProductsStart = (state) =>
  updateObject(state, {error: null, loadingProducts: true});

const getProductsSuccess = (state, action) =>
  updateObject(state, {
    loadingProducts: false,
    products: action.data,
  });

const getProductsFail = (state, action) =>
  updateObject(state, {
    error: action.error,
    loadingProducts: false,
  });

const getCategoriesStart = (state) =>
  updateObject(state, {error: null, loadingCategories: true});

const getCategoriesSuccess = (state, action) =>
  updateObject(state, {
    loadingCategories: false,
    categories: action.data,
  });

const getCategoriesFail = (state, action) =>
  updateObject(state, {
    error: action.error,
    loadingCategories: false,
  });

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_START:
      return getProductsStart(state);
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return getProductsSuccess(state, action);
    case actionTypes.GET_PRODUCTS_FAIL:
      return getProductsFail(state, action);
    case actionTypes.GET_CATEGORIES_START:
      return getCategoriesStart(state);
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return getCategoriesSuccess(state, action);
    case actionTypes.GET_CATEGORIES_FAIL:
      return getCategoriesFail(state, action);
    default:
      return state;
  }
};

export default productReducer;
