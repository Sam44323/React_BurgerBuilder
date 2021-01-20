import * as actionTypes from '../actions/actionTypes';

const initialState = {
  tokens: null,
  userId: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.error,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        tokenId: null,
        userId: null,
        isAuthenticated: false,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: actions.authData.userId,
        tokens: actions.authData.tokenId,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default reducer;
