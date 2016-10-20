var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router'); //ES6 destructuring
import Main from 'Main';

//Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

//app css - there is an alias in webpack config pointing to app.css called applicationStyles
require('style!css!sass!applicationStyles');
//The above destructuring is the same as the below
/*
var Route = require('react-router').Route;
var Router = require('react-router').Router;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
*/
//path="/" designates the root of the application
ReactDOM.render(
	<Main />,
  document.getElementById('app')
);
//Old ReactDom render method without routing
/*
ReactDOM.render(
  <h1>Boilerplate app!  </h1>,
  document.getElementById('app')
);
*/
