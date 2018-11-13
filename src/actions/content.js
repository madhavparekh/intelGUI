import request from 'superagent';
import ContentTypes from '../action-types/Content';
const types = ContentTypes;

const FETCH_EVENTS_URL =
	'https://02044b06-719f-4061-b387-5e828bc2b9ed.mock.pstmn.io/nba/events';
const FETCH_EVENT_CONTENTS_URL =
	'https://02044b06-719f-4061-b387-5e828bc2b9ed.mock.pstmn.io/cms/exp/nba/content/metadata?';
const ADD_EVENT_CONTENTS_URL =
	'https://02044b06-719f-4061-b387-5e828bc2b9ed.mock.pstmn.io/cms/exp/nba/mam/metadata';

const fetchEventsObj = (events) => {
	return {
		type: types.FETCH_EVENTS,
		events,
	};
};

const fetchEventContentsObj = (contents) => {
	return {
		type: types.FETCH_EVENT_CONTENTS,
		contents,
	};
};

const addEventContentsObj = (contents) => {
	return {
		type: types.ADD_EVENT_CONTENTS,
		contents,
	};
};

export function fetchEvents() {
	return async (dispatch) => {
		const events = await request.get(FETCH_EVENTS_URL);
		dispatch(fetchEventsObj(JSON.parse(events.text)));
	};
}

export function fetchEventContents(eventId) {
	return async (dispatch) => {
		const contents = await request.get(
			`${FETCH_EVENT_CONTENTS_URL}${eventId}`
		);
		dispatch(fetchEventContentsObj(JSON.parse(contents.text)));
	};
}

export function addEventContents(contents, event_id) {
	return async (dispatch) => {
		await request.put(`${ADD_EVENT_CONTENTS_URL}`).send({ contents });
		dispatch(addEventContentsObj(contents));
	};
}
