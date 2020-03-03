import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import style from '../components/buildAlert.scss';

import {connect } from 'react-redux';

@connect((store) => {
	return {
		currentBuildStatus: store.buildFeed.currentBuildStatus
	};
})

class CurrentBuildStatus extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {currentBuildStatus} = this.props;
		let stuffToRender = "Hello world"
		if(Object.entries(currentBuildStatus).length === 0){
			console.log('There is no status just yet');
		} else {
			if(stuffToRender.building === true){
				stuffToRender = "Build in progress";
			} else {
				stuffToRender = currentBuildStatus.result;
			}
		}
		return (
			<Card className="test-content">
				<CardText>
					{stuffToRender}
				</CardText>
			</Card>
		);
	}
}

export default CurrentBuildStatus;