import React from 'react';
import ReactDOM from 'react-dom'
import style from '../components/buildAlert.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from "react-redux";

//store
import store from '../redux/store.js';

//routes
import Layout from '../components/layout.js';
import BuildFeed from '../components/buildFeed.js'
import Settings from '../components/settings.js';
import Home from '../components/home.js';
import Weather from '../components/weather.js'
import Map from '../components/map.js';
import Login from '../components/login.js';

injectTapEventPlugin();

const app = document.getElementById("BuildAlertContainer");
const routes = (<Route path="/" component={Layout}>
					<IndexRoute component={Home}></IndexRoute>
					<Route path="buildfeed" component={BuildFeed}></Route>
					<Route path="weather" component={Weather}></Route>
					<Route path="map" component={Map}></Route>
					<Route path="settings" component={Settings}></Route>
				</Route>)

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes = {routes}></Router>
	</Provider>,
	app);