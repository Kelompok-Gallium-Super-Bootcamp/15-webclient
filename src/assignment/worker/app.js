require('./app.css');
const { store$ } = require('./store');
const {
  
} = require('./api/worker.client');

// view

// presentation layer

const state = store$.getState();
render(state);


function render(state) {
  
}
