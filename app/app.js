import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, IndexRoute, browserHistory } from 'react-router'; //ES6 destructuring
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import routes from './routes';

//Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

//app css - there is an alias in webpack config pointing to app.css called applicationStyles
require('style!css!sass!applicationStyles');

//path="/" designates the root of the application
ReactDOM.render(
	<Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
//Old ReactDom render method without routing
/*
ReactDOM.render(
  <h1>Boilerplate app!  </h1>,
  document.getElementById('app')
);
*/
