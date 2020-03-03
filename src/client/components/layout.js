import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import HomeIcon from 'material-ui/svg-icons/action/home';
import RssIcon from 'material-ui/svg-icons/communication/rss-feed'
import CloudIcon from 'material-ui/svg-icons/file/cloud'
import MapIcon from 'material-ui/svg-icons/maps/map'
import style from './buildAlert.scss';
import { Link } from 'react-router';
import io from 'socket.io-client';

import {setSettings} from '../redux/actions/settingsActions.js';
import {addFeedItem, addAllFeedItems, addCurrentBuildStatus} from '../redux/actions/buildFeedActions.js';
import {setWeather} from '../redux/actions/weatherActions.js';
import { connect } from 'react-redux';

var socket = io.connect();
var Player = new Audio("/media/shame-1.mp3");

@connect((store) => {
	return {};
})
class Layout extends React.Component {

	componentDidMount(){
		socket.emit("GetSettings");
		socket.emit("GetWeather");
		socket.on("TheWeather", this.processWeatherResponse.bind(this));
		socket.on("Settings", this.processResponse.bind(this));
		socket.on("buildResult", this.processBuildResultResponse.bind(this));
		socket.on("buildBroke", this.processBuildBroke.bind(this));
		socket.on("allPreviousResults", this.processAlBuildResponses.bind(this));
		socket.on("updateBuildInProgress", this.processBuildInProgressMessage.bind(this));
	}

	processWeatherResponse(result){
		this.props.dispatch(setWeather(result));
	}

	processResponse(sounds, timer, me){
		this.props.dispatch(setSettings(sounds, timer));
	}

	processBuildResultResponse(result){
		this.props.dispatch(addFeedItem(result));
	}

	processBuildBroke(sound){
		Player = new Audio("/media/" + sound);
		Player.play();
	}

	processAlBuildResponses(results){
		this.props.dispatch(addAllFeedItems(results));
	}

	processBuildInProgressMessage(status){
		this.props.dispatch(addCurrentBuildStatus(status));
	}

	navigate(){
		var me =this;
	}

	render() {
		return (
				<MuiThemeProvider>
					<div className='main'>
						<AppBar showMenuIconButton={false} title = 'Build Alert'/>
						<div className='body'>
							<div className='content'>{this.props.children}</div>
							<Paper className='build-alert-nav-menu'>
								<List>
									<ListItem primaryText="Home" containerElement={<Link to={'/'}/>} 
										rightIcon={<HomeIcon/>} />
									<ListItem primaryText="Build Feed" 
										containerElement={<Link to={'/buildfeed'}/>}
										rightIcon={<RssIcon/>} />
									<ListItem primaryText="Weather" 
										containerElement={<Link to={'/weather'}/>}
										rightIcon={<CloudIcon/>} />
									<ListItem primaryText="Settings" 
										containerElement={<Link to={'/settings'}/>}
										rightIcon={<SettingsIcon/>} />
								</List>
							</Paper>
						</div>
					</div>
				</MuiThemeProvider>
			);
	}		
}

export default Layout;