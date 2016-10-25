import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from 'main';
import MainDisplay from 'MainDisplay';

//The route post/:id is a parameter route.  This means that
//react-router will push whatever is send after post/... into
//the props of the component under:
// this.props.params.id
export default (
	<Route path="/" component={Main}>
		<IndexRoute component={MainDisplay} />

	</Route>
);
