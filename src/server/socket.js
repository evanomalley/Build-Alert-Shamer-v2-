var fs = require('fs');
var watcher = require('./jenkinsWatcher');
var lunchScrapper = require('./lunchScrapper');
var weather = require('./weatherInfo');
var fbClient = require('./FirebaseServerClient');

var interval,
	users = 0,
	room = "watcherRoom",
	menus = [],
	soundsOnServer = [],
	sounds = [],
	timer = 5;

module.exports = function (io) {

	//set up the connection to firebase
	//fbClient.initSetup();

	//set up the jenkins watcher
	watcher.setUpWatcher(room, io, fbClient);

	io.on('connection', function (socket) {
		socket.join(room);
		users+=1;

		var loadSettings = function() {
			var results = [];
			var dir = "public/media";

			fs.readdirSync(dir).forEach(function(file) {

				file = dir+'/'+file;
				var stat = fs.statSync(file);

				if (stat && stat.isDirectory()) {
					results = results.concat(_getAllFilesFromFolder(file));
				} else results.push(file.replace(dir+'/', ''));

			});
			results.forEach(function(result){
				var option = {
					sound: result,
					enabled: true
				}
				soundsOnServer.push(option);
			});
			sounds = results;
			watcher.updateSounds(results);
		}

		var loadMenus = function() {
			console.log("Getting the menu for this week");
			var promise = lunchScrapper.getLunchMenu();
			promise.then(function(result){
				menus = result;
				socket.emit("LoadMenus", result);
			}, function(err){
				console.log("Error" + err);
			});
		}

		watcher.getLastResult(socket);

		if(sounds.length === 0){
			loadSettings();
		}

		socket.on('disconnect', function(){
			console.log("Bye Bye");
			users-=1;
		});

		socket.on('SHAME', function() {
			console.log('someone got shamed');
			socket.broadcast.emit('startShame', "beep");
		});

		socket.on('GetSettings', function(){
			console.log('Requesting the settings');
			socket.emit('Settings', soundsOnServer, timer);
		});

		socket.on('SaveSettings', function(settings){
			var newSounds = [];

			settings.options.forEach(function(option){
				if(option.enabled){
					newSounds.push(option.sound);
				}
			});
			sounds = newSounds;
			watcher.updateSounds(newSounds);
			soundsOnServer = [];
			soundsOnServer = settings.options;
			if(settings.pingTime != timer){
				timer = settings.pingTime;
				watcher.updateWatcher(settings.pingTime);
			}
			io.to(room).emit('Settings', soundsOnServer, timer);
		});

		socket.on('GetMenus', function(){
			if(menus.length > 0){
				socket.emit("LoadMenus", menus);
			} else {
				loadMenus();
			}
		});

		socket.on('GetWeather', function(){
			var promise = weather.getWeather();
			promise.then( function(result) {
				socket.emit('TheWeather', result);
			}, function(err){
				console.log("Error " + err);
			});
		});

	});
}

