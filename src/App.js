import React, { Component } from 'react';
import './App.css';
import Events from './containers/Events';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Events />
			</div>
		);
	}
}

export default App;
