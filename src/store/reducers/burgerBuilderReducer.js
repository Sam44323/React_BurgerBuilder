import * as actionTypes from '../actions/actionTypes';
import updateStateFunction from '../reducerUtility';

//for storing the state related to the burger builder logic

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0,
  },
  totalPrice: 0,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return updateStateFunction(state, {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      });

    case actionTypes.REMOVE_INGREDIENT:
      return updateStateFunction(state, {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      });

    case actionTypes.RESET_INGREDIENTS:
      return updateStateFunction(state, {
        ingredients: {
          salad: 0,
          bacon: 0,
          meat: 0,
          cheese: 0,
        },
        totalPrice: 0,
      });

    case actionTypes.SET_ERROR:
      return updateStateFunction(state, {
        error: true,
      });

    default:
      return state;
  }
};

export default reducer;
