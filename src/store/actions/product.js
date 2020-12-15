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

export const getProducts = (data) => async (dispatch) => {
  dispatch(getProductStart());

  try {
    const response = await axios.post('/products', data);
    console.log(response.data);
    dispatch(getProductSuccess(response.data.data.data));
    return 'success';
  } catch (e) {
    dispatch(getProductFail(e.message));
  }
};
