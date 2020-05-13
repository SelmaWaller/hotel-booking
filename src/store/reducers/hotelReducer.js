import {GET_HOTELS, NO_HOTELS} from '../actions/actionTypes';

const initialState = [];

const CardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOTELS:
      return {
        ...state,
        ...action,
      };
    case NO_HOTELS:
      return {
        ...state,
        hotels: [],
      };
    default:
      return state;
  }
};

export default CardReducer;
