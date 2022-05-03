var React = require('react');

//REACT ROUTER V4
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './components/homepage/homepage';

var routes = (
	// REACT ROUTER V4
	<Router>
		<Switch>
			<Route exact path="/" component={HomePage} />
		</Switch>
	</Router>
);

export default routes;