import React from 'react';
import PropTypes from 'prop-types';

const RenderContents = (eventContents) => {
	console.log(eventContents);
	return (
		<div>
			<h1>Event</h1>
			<p />
		</div>
	);
};

RenderContents.propTypes = {
	eventContents: PropTypes.object,
};

export default RenderContents;
