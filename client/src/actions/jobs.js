import axios from 'axios';

export const JOBS = 'JOBS';
export const ADD_JOB = 'ADD_JOB';
export const SET_CURRENTJOB = 'SET_CURRENTJOB';
export const GET_LISTINGS = 'GET_LISTINGS';
export const DELETE_LISTING = 'DELETE_LISTING';
export const UPDATE_LISTING = 'UPDATE_LISTING';
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const MORE_JOBS = 'MORE_JOBS';
export const FILTER_BY_URGENCY = 'FILTER_BY_URGENCY';
export const SEARCH_T_D = 'SEARCH_T_D';

export const getJobs = (nextPage) => {
  return (dispatch) => {
    axios.get(`/api/available_jobs?page=${nextPage}`)
      .then( res => {
        let { jobs, total_pages } = res.data;
        let hasMore = total_pages > nextPage
        if (nextPage > 1) {
          dispatch({
            type: MORE_JOBS,
            jobs,
            page: nextPage,
            hasMore
          })
        } else {
          dispatch({
            type: JOBS,
            jobs,
            filteredJobs: [...jobs],
            page: nextPage,
            total_pages,
            hasMore
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const addJob = (job, cb) => {
  return (dispatch) => {
    let data = new FormData()
    data.append('photos', job.photos)
    axios.post(`/api/jobs?name=${job.name}&description=${job.description}&location=${job.location}&urgent=${job.urgent}&category=${job.category}&insurance=${job.insurance}&bbb_approved=${job.bbb_approved}&distance=${job.distance}&rating=${job.rating}&user_id=${job.user_id}`, data)
      .then( res => {
        dispatch({ type: ADD_JOB, job: res.data })
        dispatch({ type: SET_CURRENTJOB, job: res.data})
        cb( res.data.id )
      })
  }
}

export const setCurrentJob = (id, cb = () =>{}) => {
  return (dispatch) => {
    axios.get(`/api/jobs/${id}`)
      .then( res => {
        dispatch({ type: SET_CURRENTJOB, job: res.data})
        cb(res.data.id)
    })
  }
}

export const getListings = (id) => {
  return (dispatch) => {
    axios.get(`/api/my_listings?id=${id}`)
      .then( res => dispatch({ type: GET_LISTINGS, listings: res.data }))
  }
}

export const deleteListing = (id) => {
  return (dispatch) => {
    axios.delete(`/api/jobs/${id}`)
    .then( res => dispatch({ type: DELETE_LISTING, id, headers: res.headers  }) )
  }
}


export const updateListing = (job) => {
  return (dispatch) => {
    let data = new FormData()
    data.append('photos', job.photos)
    axios.put(`/api/jobs/${job.id}?name=${job.name}&description=${job.description}&location=${job.location}&urgent=${job.urgent}&category=${job.category}&insurance=${job.insurance}&bbb_approved=${job.bbb_approved}&distance=${job.distance}&rating=${job.rating}&user_id=${job.user_id}`, data)
      .then( res => {
        dispatch({ type: UPDATE_LISTING, job: res.data, headers: res.headers  })
      })
  }
}

export const categoryFilter = (category) => {
  return (dispatch) => {
    dispatch({type: FILTER_BY_CATEGORY, category})
  }
}

export const urgencyToggle = (urgent) => {
  return (dispatch) => {
    dispatch({ type: FILTER_BY_URGENCY, urgent})
  }
}

export const searchTitleDescription = (search) => {
  return (dispatch) => {
    dispatch({ type: SEARCH_T_D, search })
  }
}

export const clearFilters = () => dispatch => {
  dispatch({ type: CLEAR_FILTERS })
}
