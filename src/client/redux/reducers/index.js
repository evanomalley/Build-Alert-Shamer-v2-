import { combineReducers } from 'redux';

import settings from './settingsReducer.js';
import buildFeed from './buildFeedReducer.js';
import weather from './weatherReducer.js';

export default combineReducers({
	settings,
	buildFeed,
	weather
})