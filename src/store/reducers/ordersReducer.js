import * as actionTypes from '../actions/actionTypes';
import updatedStateFunction from '../reducerUtility';

const initialState = {
  orders: [],
  loading: false,
  error: '',
};

const purchaseSuccsess = (state, actions) => {
  const newOrder = {
    ...actions.orderData,
    id: actions.orderId,
  };
  const ordersArray = [...state.orders];
  return ordersArray.push(newOrder);
};

const orderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const ordArr = purchaseSuccsess(state, actions);
      return updatedStateFunction(state, {
        orders: ordArr,
        loading: false,
      });

    case actionTypes.SET_LOADING_VALUE:
      return updatedStateFunction(state, { loading: true });

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updatedStateFunction(state, {
        loading: false,
        error: actions.error,
      });

    default:
      return state;
  }
};

export default orderReducer;
