import axios from 'axios';
export const GET_BIDS = 'GET_BIDS';
export const ADD_BID = 'ADD_BID';

export const getBids = (cb) => {
  return (dispatch) => {
    axios.get('/api/bids')
      .then( res => dispatch({ type: GET_BIDS, bids: res.data }) )
      .then( cb() )
  }
}

export const setNewBid = (newBid) => {
  return (dispatch) => {
    dispatch({ type: 'SET_NEW_BID', newBid})
  }
}

export const addBid = (bid) => {
  return (dispatch) => {
    axios.post('/api/bids', { bid })
      .then( res => dispatch({ type: ADD_BID, bid: res.data }) )
  }
}

export const requestToBid = (id, jobId, cb) => dispatch => {
    axios.post(`/api/request_to_bid?id=${id}&job_id=${jobId}`)
      .then( res => {
        dispatch ({ type: "SET_FLASH", message: res.data, color: "green"})
        cb()
      })
      .catch(err => console.log(err))
}

export const newBidRequest = (data) => dispatch => {
  let count = data.worker_ids.split(',').length
  axios.post('/api/bid_requests', data)
    .then( res => {
      dispatch({ type: "SET_FLASH", message: `Your ${count} Bid Requests were Sent`, color: "green" })
    })
    .catch( error => {
      console.log(error)
    })
}
