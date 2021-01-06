//for creating actions for the orders purposes
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: orderId,
    orderData: orderData,
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

//THE ASYNC ACTION CREATORS WHICH WILL DISAPATCH ANY ONE OF THE ACTIONS DEPENDING UPON THE RESPONSE

export const addPurchaseOrder = (orderdata, redirectFunction) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_LOADING_VALUE });
    axios
      .post('/orders.json', orderdata)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderdata));
        redirectFunction.replace('/'); // redirecting to the home page after we dispatch the action of adding the new order
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailure(error));
      });
  };
};
