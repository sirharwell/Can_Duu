import {
  GET_BIDS,
  ADD_BID,
} from '../actions/newBid';

const initialState = {
  currentBid: {},
  bids: [],
}

const bids = ( state = initialState, action ) => {
  switch (action.type) {
    case  GET_BIDS:
      return {...state, bids: action.bids}
    case ADD_BID:
      return {...state, bids: [action.bid, ...state.bids]}
    default:
      return state
  }
}

export default bids;
