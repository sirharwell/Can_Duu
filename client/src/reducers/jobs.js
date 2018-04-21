import {
  JOBS,
  MORE_JOBS,
  ADD_JOB,
  SET_CURRENTJOB,
  GET_LISTINGS,
  UPDATE_LISTING,
  DELETE_LISTING,
  FILTER_BY_CATEGORY,
  CLEAR_FILTERS,
  FILTER_BY_URGENCY,
  SEARCH_T_D,
} from '../actions/jobs';

const initialState = {
  currentJob: {},
  jobs: [],
  listings: [],
  page: 0,
  total_pages: 1,
  hasMore: true,
  filteredJobs: [],
}

const jobs = ( state = initialState, action ) => {
  switch (action.type) {
    case JOBS:
      return {
        ...state,
        jobs: action.jobs,
        page: action.page,
        hasMore: action.hasMore,
        filteredJobs: action.jobs,
        total_pages: action.total_pages,
      }
    case MORE_JOBS: {
      let more = [...state.jobs, ...action.jobs]
      return {
        ...state,
        jobs: more,
        filteredJobs: more,
        hasMore: action.hasMore,
        page: action.page,
      }
    }
    case ADD_JOB:
      return {...state, jobs: [action.job, ...state.jobs]};
    case SET_CURRENTJOB:
      return {...state, currentJob: action.job};
    case GET_LISTINGS:
      return {...state, listings: action.listings};
    case UPDATE_LISTING:
      let updated = state.jobs.map( j => {
        if (j.id === action.job.id)
          return action.job
        return j
      })
      return {...state, jobs: updated, currentJob: action.job }
    case DELETE_LISTING:
      let listings =  state.listings.filter( l => l.id !== action.id )
      let jobs = state.jobs.filter( l => l.id !== action.id )
      return { ...state, listings, jobs, filteredJobs: jobs }
    case FILTER_BY_CATEGORY:
      let toggle = state.jobs.filter(f => f.category.toLowerCase() === action.category)
      return { ...state, filteredJobs: toggle };
    case FILTER_BY_URGENCY:
      let urgent = state.jobs.filter(u => u.urgent === action.urgent)
      return { ...state, filteredJobs: urgent };
    case SEARCH_T_D: {
        let reg = new RegExp(action.search.toLowerCase(), "g")
        let searchTD = state.jobs.filter(s => !!(reg.exec(s.name.toLowerCase())) || !!(reg.exec(s.description.toLowerCase())))
        return {...state, filteredJobs: searchTD};
    }
    case CLEAR_FILTERS:
      let cleared = state.jobs
      return { ...state, filteredJobs: cleared };
    default:
      return state
  }
}

export default jobs;
