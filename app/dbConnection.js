var connection;
module.exports = {
    connect : function() {
        var mysql = require('mysql');
        connection = mysql.createConnection({
            host: 'crushdb.cdqeexj2kzep.us-east-2.rds.amazonaws.com',
            user: 'crush',
            password: 'crushrocks',
            port: '3306',
            database: 'crushdb'
        });

        connection.connect(function (err) {
            if (err) {
                console.error('Database connection failed: ' + err.stack);
                return;
            }

            console.log('Connected to database.');
        });
        return connection;
    },

    // Create_Table : function(connection){
    //     connection.query ('CREATE TABLE TRIGGERS (TRIGGER_NAME VARCHAR(255), TRIGGER_TYPE VARCHAR(255),Amount INT , Amount_MAX INT, ON_OFF  enum("TRUE","FALSE"), SAVED DOUBLE, WEATHER_TYPE VARCHAR(20) );')
    //
    // },
    Get_All : function(){
        return new Promise(function(resolve, reject) {
            connection.query('SELECT * FROM TRIGGERS', function (error, results, fields) {
                if (error) { return reject(error); }
                return resolve(results);
            });
        });
    },
    Insert_New : function(TRIGGER_NAME,trigger_type,Amount_to_save,MAX_to_be_saved, WEATHER_TYPE = null, TWITTER_USERNAME = null, TWITTER_HASHTAG = null){
        connection.query('INSERT INTO TRIGGERS (TRIGGER_NAME, TRIGGER_TYPE,Amount, Amount_MAX, ON_OFF, SAVED, WEATHER_TYPE, TWITTER_USERNAME, TWITTER_HASHTAG) VALUES (\"'+TRIGGER_NAME+'\", \"'+trigger_type+'\", '+Amount_to_save+','+MAX_to_be_saved+',"TRUE",0,\"'+WEATHER_TYPE+'\", \"'+TWITTER_USERNAME+'\", \"'+TWITTER_HASHTAG+'\");')

    },
    Delete_Row: function (TRIGGER_NAME) {
        connection.querry('DELETE WHERE TRIGGERS.TRIGGER_NAME = \"' + TRIGGER_NAME + '\" ');

    },
    Turn_On_off : function(TrueFalse, Trigger_Name){

        connection.querry('UPDATE TRIGGERS SET ON_OFF = \"' + TrueFalseWHERE + '\" TRIGGER_NAME = \"' + Trigger_Name+ '\"');
    }
};


