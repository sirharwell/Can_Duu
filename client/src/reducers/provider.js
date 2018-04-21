const provider = (state = {}, action) => {
  switch (action.type) {
    case 'WORKER_INFO': {
      return action.info;
    }
    case 'CLEAR_WORKER':
      return {};
    case 'UPDATE_PROVIDER':
      return action.provider;
    default:
      return state;
  }
};

export default provider;
