import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import reducer from './reducers';

const logger = createLogger();

const middleware = applyMiddleware(logger);

export default createStore(reducer, middleware);