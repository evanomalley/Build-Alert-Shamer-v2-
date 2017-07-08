var firebase = require('firebase-admin'),
    FCM = require('fcm-node'),
    config = require('./config.js'),
    fireApp = null,
    ref = '',
    pastBuildsRef = '',
    tokenRef = '',
    serverKey = '',
    topic = '',
    fcmCli = '',
    buildsCount = 0,
    pastBuildsArray = []

var firebaseServerClient = {

    initSetup : function (){
        console.log("setting up firebase connection");

        fireApp = firebase.initializeApp({
            credential: firebase.credential.cert(config.serviceAccount),
            databaseURL: config.databaseURL
        });

        ref = fireApp.database().ref('RecentBuild'),
        serverKey = config.serverKey,
        topic = "/topics/BuildStatus",
        fcmCli = new FCM(serverKey);
        pastBuildsRef = fireApp.database().ref('PastBuilds');

        //read the past builds from firebase
        pastBuildsRef.on('value', function(snapshot) {
            pastBuildsArray = [];
            snapshot.forEach(function(urlSnapshot) {
                pastBuildsArray.push(urlSnapshot.key);
            });
            buildsCount = pastBuildsArray.length;
        });
    },

    /**
    *   Sends a push notification to all device listening to the topic
    */
    sendMessage : function (title, message){
        var payload = {
            to: topic,
            priority: 'high',
            content_available: true,
            notification: {
                title: title, body: message, sound: 'default', badge: '1'
            }
        };

        fcmCli.send(payload, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Sent out push notification");
            }
        });
    },

    updateBuildStatus : function (status, buildNumber, result){
        var buildStatus = {
            buildNumber : buildNumber,
            status : status
        }
        ref.set(buildStatus);
        buildStatus.status = result;
        if(buildsCount >= 25){
            var nRef = fireApp.database().ref('PastBuilds').child(pastBuildsArray[0].toString());
            nRef.remove();
        }
        pastBuildsRef.push(buildStatus);
    }
}

module.exports = firebaseServerClient;