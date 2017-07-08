import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import style from '../components/buildAlert.scss';


class WeatherCard extends React.Component {

	constructor(props) {
		super(props);
	}

	getGoogleIcon(icon) {
		const weatherIconMap = {
			'chanceflurries' : 'https://ssl.gstatic.com/onebox/weather/64/snow_light.png',
			'chancerain' : 'https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png',
			'chancesleet' : 'https://ssl.gstatic.com/onebox/weather/64/sleet.png',
			'chancetstorms' : 'https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png',
			'clear' : 'https://ssl.gstatic.com/onebox/weather/64/sunny.png',
			'cloudy' : 'https://ssl.gstatic.com/onebox/weather/64/cloudy.png',
			'fog' : 'https://ssl.gstatic.com/onebox/weather/64/fog.png',
			'mostlysunny' : 'https:///ssl.gstatic.com/onebox/weather/64/partly_cloudy.png',
			'partlycloudy' : 'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png',
			'rain' : 'https://ssl.gstatic.com/onebox/weather/64/rain.png',
			'sleet' : 'https:///ssl.gstatic.com/onebox/weather/64/sleet.png',
			'snow' : 'https:///ssl.gstatic.com/onebox/weather/64/snow.png',
			'sunny' : 'https://ssl.gstatic.com/onebox/weather/64/sunny.png',
			'tstorms' : 'https://ssl.gstatic.com/onebox/weather/64/thunderstorms.png'
		};

		return weatherIconMap[icon];
	};

	render() {

		const icon = this.getGoogleIcon(this.props.icon);

		return (
			<Card className="weatherCard">
				<CardTitle title={this.props.day}/>
				<CardText>
					<img src={icon}/>
					<h3>{this.props.high} {this.props.low}</h3>
				</CardText>
			</Card>
		);
	}
}

export default WeatherCard;
