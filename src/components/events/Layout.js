import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';
import RenderContents from './RenderContents';

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = { eventContents: null };
	}

	async getEventContents(eventId) {
		const eventContents = await this.props.fetchEventContents(eventId);
		console.log(this.props.eventContents);
		this.setState({ eventContents });
	}

	render() {
		return (
			<div style={{ width: '80%', margin: 'auto' }}>
				{this.props.events &&
					this.props.events.map((event, indx) => {
						return (
							<ExpansionPanel
								key={indx}
								onChange={() =>
									this.getEventContents(event.eventId)
								}
							>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
								>
									<Typography>{`League: ${event.league} | ${
										event.awayTeam.name
									} vs ${event.homeTeam.name} @ ${
										event.venue.city
									} | Date: ${
										event.date.split('T')[0]
									}`}</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails
									style={{
										textAlign: 'left',
									}}
								>
									<Typography>
										<p>{`Season: ${event.season}`}</p>
										<p>{`Game : ${event.eventType}`}</p>
										<p>{`Start Time : ${
											event.date
												.split('T')[1]
												.split(':00.')[0]
										}`}</p>
										<Divider />
										<RenderContents
											eventContent={
												this.props.eventContents
											}
										/>
									</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						);
					})}
			</div>
		);
	}
}

Layout.propTypes = {
	events: PropTypes.array,
	fetchEventContents: PropTypes.func,
	eventContents: PropTypes.object,
};
