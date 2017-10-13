var jenkinsapi = require('jenkins-api'),
	config = require('./config.js');
 
// no auth 
var jenkins = jenkinsapi.init(config.jenkinsServer),
	room = '',
	timer = 5,
	lastResult = null;
	fbClient = null,
	io = null,
	interval = null,
	mySounds = [];

var jenkinsWatcher = {

	setUpWatcher : function(room, io, fbClient){
		this.room = room;
		this.io = io;
		this.fbClient = fbClient;
		console.log('setting up watcher');
		this.checkBuild();
		interval = setInterval(this.checkBuild.bind(this), timer * 60000);
	},

	updateWatcher : function(newTime){
		clearInterval(interval);
		interval = setInterval(this.checkBuild, (newTime * 60000) );
	},

	updateSounds: function(sounds){
		console.log('Updating sounds');
		mySounds = sounds.slice();
	},
	
	//Function to watch the build and process the result
	checkBuild : function() {
		var me = this;
		var promise = new Promise(function(resolve, reject){

			jenkins.last_build_info(config.project, function(err, data) {
			  if (err){ 
			  	console.log('Error checking build');
			  	reject(Error("oops"));
			  } else {
				resolve(data);
				me.processResult(data);
			}
			});

		});
		return promise;
	},

	getLastResult : function(socket){
		if(lastResult !== null){
		 	if(lastResult.result === 'FAILURE'){
		 		var sound = this.getRandomSound();
		 		socket.emit('buildBroke', sound)
		 	}
		 	socket.emit('buildResult', lastResult);
		}
	},

	/**
	* Gets a random sound from the list of enabled sounds and returns it
	*/
	getRandomSound : function(){
		if(mySounds.length > 0){
			var sound = mySounds[Math.floor(Math.random()*mySounds.length)];
			return sound;
		}
		return '';
	},

	// given the data check the result
	processResult : function(result){
		if(lastResult === null || lastResult.number !== result.number ){
			if(result.result === 'FAILURE'){
				console.log('failure');
				this.io.to(this.room).emit('buildResult', result);
				var sound = this.getRandomSound();
				this.io.to(this.room).emit('buildBroke', sound);
				this.fbClient.updateBuildStatus('Build is broken', result.number, result.result);
				this.fbClient.sendMessage("Status", (result.number + " " + result.result).toString());
				lastResult = result;
			}
			if(result.result === 'SUCCESS'){
				console.log('Success');
				this.io.to(this.room).emit('buildResult', result);
				lastResult = result;
				this.fbClient.updateBuildStatus('Build is fine', result.number, result.result);
				this.fbClient.sendMessage("Status", (result.number + " " + result.result).toString());
				lastResult = result;
			}
		}
	}
}
module.exports = jenkinsWatcher;