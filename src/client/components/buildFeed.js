import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import SVD from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import SVS from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import Divider from 'material-ui/Divider';
import style from '../components/buildAlert.scss';

import {connect } from 'react-redux';

@connect((store) => {
	return {
		count: store.buildFeed.count,
		results: store.buildFeed.results
	};
})

class BuildFeed extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {count, results} = this.props;

		const feedList = [];

		var index = 0;

		results.forEach(function(item){
			if(item.result === "SUCCESS"){
				feedList.unshift(<Divider key = {index}/>);
				feedList.unshift(
					<ListItem key={item.number} primaryText="SUCCESS" secondaryText={"Build# " + item.number} rightIcon={<SVS className="icon-success"/>}/>
				);
			} else {
				feedList.unshift(
					<ListItem key={item.number} primaryText="FAILURE" secondaryText={"Build# " + item.number} rightIcon={<SVD className="icon-fail"/>}/>
				);
			}
			index+=1;
		});

		return (
			<Card>
				<CardTitle title="Build Feed"/>
				<CardText>
				    <List>
				    	{feedList}
				    </List>
				</CardText>
			</Card>
		);
	}
}

export default BuildFeed;