import burgerReducer from '../reducers/burgerBuilderReducer';
import orderReducer from '../reducers/ordersReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  burger: burgerReducer,
  orders: orderReducer,
});

export default rootReducer;
