const loggingMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log('dispatch', action.type);
      let result = next(action);
      return result;
    };
  };
};

const delayActionMiddleware = (store) => (next) => (action) => {
  console.log('state', store.getState());
  if (action.type === 'done') {
    setTimeout(() => {
      next(action);
    }, 0);
  } else {
    next(action);
  }
};


module.exports = {
  loggingMiddleware,
  delayActionMiddleware,
};
