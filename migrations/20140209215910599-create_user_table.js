var mysql = require('mysql');
var db = require('../middleware/db.js').db;



exports.up = function(next){

    db.query(
        "CREATE TABLE IF NOT EXISTS user (" 
        + "id INT(10) NOT NULL AUTO_INCREMENT, " 
        + "name VARCHAR(128), " 
        + "email VARCHAR(128) NOT NULL UNIQUE, " 
        + "password VARCHAR(256) NOT NULL, " 
        + "img VARCHAR(128),"
        + "description LONGTEXT,"
        + "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"
        + "PRIMARY KEY(id))",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
            
   
};


exports.down = function(next){
    
    db.query(
        "DROP TABLE IF EXISTS user",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
   
};
