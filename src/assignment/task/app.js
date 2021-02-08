require('./app.css');
const { store$ } = require('./store');
const {
  
} = require('./api/task.cliient');

// view

// presentation layer

const state = store$.getState();
render(state);


function render(state) {
  
}
