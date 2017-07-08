import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import style from '../components/buildAlert.scss';
import WeatherCard from '../components/WeatherCard.js';

import {connect } from 'react-redux';

@connect((store) => {
	return {
		weather: store.weather.weather
	};
})

class Weather extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {weather} = this.props;

		const weatherCards = [];

		if(weather.simpleforecast){
			var forecast = weather.simpleforecast.forecastday;
			for(var i = 0; i < 5; i++){
				var day = forecast[i];
				var weatherCard = <WeatherCard key={i} icon={day.icon} day={day.date.weekday_short} high={day.high.fahrenheit} low={day.low.fahrenheit}/>;
				weatherCards.push(weatherCard);
			}
		}

		return (
			<Card>
				<CardTitle title="Weather"/>
				<CardText className="weatherCardContainer">
					{weatherCards}
				</CardText>
			</Card>
		);
	}
}

export default Weather;