import ContentTypes from '../action-types/Content';
import objectAssign from 'object-assign';

const types = ContentTypes;

type STATE = {};
type ACTION = {};
const initialState: STATE = {
	events: null,
	eventContents: null,
	addEventContents: null,
};

export default function(state: STATE = initialState, action: ACTION) {
	switch (action.type) {
		case types.FETCH_EVENTS:
			return objectAssign({}, state, { events: action.events });
		case types.FETCH_EVENT_CONTENTS:
			return objectAssign({}, state, {
				eventContents: action.contents,
			});
		case types.ADD_EVENT_CONTENTS:
			return objectAssign({}, state, {
				addEventContents: action.contents,
			});

		default:
			return state;
	}
}
