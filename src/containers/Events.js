import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	fetchEvents,
	fetchEventContents,
	addEventContents,
} from '../actions/content';

import Layout from '../components/events/Layout';

export class Events extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current20Events: null,
			displayIndx: 0,
		};
	}

	async componentDidMount() {
		await this.props.fetchEvents();
		this.get20Events(this.state.displayIndx);
	}

	get20Events(indx) {
		const twentyEvents = this.props.events.events.slice(
			indx * 20,
			indx * 20 + 20
		);
		this.setState({
			current20Events: twentyEvents,
			displayIndx: indx,
		});
	}

	getNext20Events() {
		const indx = this.state.displayIndx + 1;
		this.get20Events(indx);
	}

	getPrev20Events() {
		const indx = this.state.displayIndx - 1;
		this.get20Events(indx);
	}

	render() {
		return (
			<div>
				{this.props.events && (
					<div style={{ width: '90%', margin: 'auto' }}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								padding: '10px',
								marign: 'auto',
								alignSelf: 'center',
							}}
						>
							{this.state.displayIndx ? (
								<div
									onClick={() => this.getPrev20Events()}
									style={{ float: 'left' }}
								>
									Previous 20
								</div>
							) : null}
							{
								<div
									onClick={() => this.getNext20Events()}
									style={{ float: 'right' }}
								>
									Next 20
								</div>
							}
						</div>
						<Layout
							events={this.state.current20Events}
							fetchEventContents={(eventID) =>
								this.props.fetchEventContents(eventID)
							}
							eventContents={this.props.eventContents}
						/>
					</div>
				)}
			</div>
		);
	}
}

Events.propTypes = {
	events: PropTypes.object,
	eventContents: PropTypes.object,
	addEventContents: PropTypes.func,
	fetchEvents: PropTypes.func,
	fetchEventContents: PropTypes.func,
};

const mapStateToProps = (state) => {
	return {
		events: state.content.events,
		eventContents: state.content.eventContents,
		addEventContents: state.content.addEventContents,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchEvents: () => dispatch(fetchEvents()),
		fetchEventContents: (id) => dispatch(fetchEventContents(id)),
		addEventContents: () => dispatch(addEventContents()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Events);
