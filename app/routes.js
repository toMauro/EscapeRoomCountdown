module.exports = function(app) {

    app.get('/triggers', function(req, res) {
        var Promise = require('bluebird');
        var mainPageInfo = require('./mainPageInfo');
        var twitterTrigger = require('./twitterTrigger');
        var weather = require('./weather');
        var dbconnection = require('./dbConnection');
        var connection=dbconnection.connect();

        // Get parameters
        var twitterUsername = (req.query.twitterUsername !== undefined) ? req.query.twitterUsername : 'ToMauro_';
        var twitterHashtag  = (req.query.twitterHashtag !== undefined) ? req.query.twitterHashtag : 'world';

        //connection.query("ALTER TABLE TRIGGERS ADD WEATHER_TYPE enum('CLOUDY','RAIN','SUNNY');")
        //dbconnection.Insert_New('WeatherTrigger','Weather',30,200,"Cloudy");
        Promise.all([dbconnection.Get_All(),twitterTrigger.findHashtagInstances(twitterUsername,twitterHashtag), weather.getWeather()]).then(function(response){

            var dataResponse=response[0];
            var twitterResonse=response[1];
            var weatherResponse=response[2];
            res.send(mainPageInfo.getMainPageInfo(dataResponse,twitterResonse,weatherResponse));
        });
        connection.end();
    });

    app.post('/triggers-new', function(req,res){
        res.json(req.body);
        var dbconnection = require('./dbConnection');
        var connection=dbconnection.connect();

        dbconnection.Insert_New(req.body.triggerName,req.body.triggerType,req.body.amount,req.body.maxAmount, req.body.weather.type, req.body.twitter.username, req.body.twitter.hashtag);

        connection.end();
    });

    app.delete('/triggerDelete', function(req,res){
        res.json(req.body);
        var dbconnection = require('./dbConnection');
        var connection=dbconnection.connect();

        dbconnection.Delete_Row(req.body);
        connection.end();
    });
};