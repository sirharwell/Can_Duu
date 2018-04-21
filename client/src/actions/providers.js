import axios from 'axios';

export const searchedProviders = (search, id, filters) => {
  return (dispatch) => {
    axios.get(`/api/search_worker_suggestions?search=${search}&id=${id}&filters=${filters}`)
      .then( res => {
        dispatch({ type: 'SEARCH_PROVIDERS', providers: res.data})
      })
  }
}

export const fetchProvider = (id) => {
  return (dispatch) => {
    axios.get(`/api/workers/${id}`)
      .then( res => {
        dispatch({ type: 'FETCH_PROVIDER', fetchProvider: res.data})
      })
  }
}

export const updateProvider = (worker) => {
  return (dispatch) => {
    let data = new FormData()
    data.append('logo', worker.logo)
    axios.put(`/api/workers/${worker.id}?name=${worker.name}&email=${worker.email}&bio=${worker.bio}&category=${worker.category}&insurance=${worker.insurance}&service_area=${worker.service_area}&phone_number=${worker.phone_number}&street=${worker.street}&city=${worker.city}&state=${worker.state}&zip=${worker.zip}`, data)
    .then ( res => {
      dispatch({ type: 'UPDATE_PROVIDER', provider: res.data})
    })
    .catch( err => console.log(err))
  }

}
