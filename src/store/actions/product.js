import * as actionTypes from './types';
import axios from '../../services/axios';

const getProductStart = () => ({
  type: actionTypes.GET_PRODUCTS_START,
});

const getProductSuccess = (data) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  data,
});

const getProductFail = (error) => ({
  type: actionTypes.GET_PRODUCTS_FAIL,
  error,
});

export const getProducts = () => async (dispatch) => {
  dispatch(getProductStart());

  try {
    const response = await axios.get('/products');
    console.log(response.data);
    dispatch(getProductSuccess(response.data.data.data));
    return 'success';
  } catch (e) {
    dispatch(getProductFail(e.message));
  }
};

const getCategoriesStart = () => ({
  type: actionTypes.GET_CATEGORIES_START,
});

const getCategoriesSuccess = (data) => ({
  type: actionTypes.GET_CATEGORIES_SUCCESS,
  data,
});

const getCategoriesFail = (error) => ({
  type: actionTypes.GET_CATEGORIES_FAIL,
  error,
});

export const getCategories = () => async (dispatch) => {
  dispatch(getCategoriesStart());

  try {
    const response = await axios.get('/categories');
    console.log(response.data);
    dispatch(getCategoriesSuccess(response.data.data));
    return 'success';
  } catch (e) {
    dispatch(getCategoriesFail(e.message));
  }
};
