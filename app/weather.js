var request = require('request');
module.exports = {
    getWeather: function(){
        return [{"Day" : "SAT", "Condition" : "RAIN"},
            {"Day" : "SUN", "Condition" : "CLOUDY"},
            {"Day" : "MON", "Condition" : "CLOUDY"},
            {"Day" : "TUE", "Condition" : "CLOUDY"},
            {"Day" : "WED", "Condition" : "RAIN"}];

        // return new Promise(function(resolve, reject) {
        //     request('http://api.openweathermap.org/data/2.5/forecast?id=4120388&APPID=29691b07fab97eec0e59ef07ae7ee020', function (error, response, body) {
        //         if (error) { return reject(error); }
        //
        //         if (!error && response.statusCode == 200) {
        //             var json = JSON.parse(response.body);
        //             return resolve(json.list[0].weather[0].main);
        //         }
        //     });
        // });
    },

};