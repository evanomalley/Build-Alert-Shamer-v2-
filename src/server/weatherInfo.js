var Wunderground = require('node-weatherunderground');
var client = new Wunderground(),
	config = require('./config.js');

var weatherInfo = {

	/**
	* get the weather for a given location, uses a promise to 
	* return the data when the api comes back with a forcast
	*/
	getWeather: function (){

		var promise = new Promise(function(resolve, reject) {
			var opts = {
				key: config.weatherKey,
				city: 'Lexington',
				state: 'MA'
			}
			client.forecast10day(opts, function (err, result) {
				if (err){
					console.log(err);
					reject(Error("oops"));
				}else {
					resolve(result);
				}
			});
		});
		return promise;
	}
}

module.exports = weatherInfo;