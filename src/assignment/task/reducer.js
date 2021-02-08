// setup state
const initialState = [
  {
    id: 1,
    job: 'ngoding',
    attachment: 'afafaaf.png',
    done: false,
    cancel: false,
  },
  {
    id: 2,
    job: 'debugging',
    attachment: 'aaaaa.png',
    done: true,
    cancel: false,
  },
];

function add(state, action) {
  state.push({ 
    id: action.payload.id,
    job
   })
}

// reduce function

module.exports = {
  initialState,
};
