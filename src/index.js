import React from 'react';
import { render } from 'react-dom';
import App from 'components/app';
import store from './store/index';
import { Provider } from 'react-redux';
import { addArticle } from './actions/actions';

//just for testing, remove later
window.store = store;
//console.log("Hello from src/index.js");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);