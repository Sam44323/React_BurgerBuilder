import burgerReducer from '../reducers/burgerBuilderReducer';
import orderReducer from '../reducers/ordersReducer';
import authReducer from '../reducers/authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  burger: burgerReducer,
  orders: orderReducer,
  auth: authReducer,
});

export default rootReducer;
