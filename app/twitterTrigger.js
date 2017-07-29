var twitter = require('twitter'),

    client = new twitter({
        consumer_key: 'DqMMay1HWASq4bRsygr7qZqHR',
        consumer_secret: 'Z7n0LVtdUZUIiQJzZ6T2W6lXb00qc2G3H2zsfI8BDDj5veVVhD',
        access_token_key: '158121702-HnX2niOSci1jLGNnjYf9vBxcqB2OBr2nLPWV5Llp',
        access_token_secret: '7B1NVZ7H3cbuk9dOb4OBDeePtIqT5Rfsqj83YJPALrkWg'
    });

var $ = require('jquery');

module.exports = {

    findHashtagInstances: function(username, searchHashtag){
        return new Promise(function(resolve, reject) {
            var params = {screen_name: username, count: 5};


            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    //console.log(tweets);

                    var count = 0;

                    for (var x = 0; x < tweets.length; x++) {

                        var tweetHashtags = tweets[x].entities.hashtags;

                        for (var y = 0; y < tweetHashtags.length; y++) {
                            var tag = tweetHashtags[y].text;
                            if (tag.toLowerCase() === searchHashtag.toLowerCase()) {
                                count++;
                            }
                        }
                    }
                    if (error) { return reject(error); }
                    return resolve(count);
                }
            });

        });
    },
};