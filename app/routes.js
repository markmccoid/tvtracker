import React from 'react';
import { Route, IndexRoute } from 'react-router';
import firebase from '../app/firebase';

import Main from 'main';
import MainDisplay from 'MainDisplay';
import GroupMain from 'GroupMain';
import Login from 'Login';

//React Router middleware below.
var requireLogin = (nextState, replace, next) => {
	if (!firebase.auth().currentUser) {
		replace('/');
	}
	next();
};
var redirectIfLoggedIn = (nextState, replace, next) => {
	if (firebase.auth().currentUser) {
		replace('/main');
	}
	next();
};

//The route post/:id is a parameter route.  This means that
//react-router will push whatever is send after post/... into
//the props of the component under:
// this.props.params.id
export default (
	<Route path="/" component={Main}>
		<IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
		<Route path="main" component={MainDisplay} onEnter={requireLogin}/>
		<Route path="groupmanage" component={GroupMain} />
	</Route>
);
