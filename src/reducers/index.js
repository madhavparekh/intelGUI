import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import content from './content';

const rootReducer = combineReducers({
	routing: routerReducer,
	content,
});

export default rootReducer;
