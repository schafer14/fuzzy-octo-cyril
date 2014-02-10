var mysql = require('mysql');
var db_conf = require('../middleware/db.js');

var db = mysql.createConnection({
    host: db_conf.db.host,
    user: db_conf.db.user,
    password: db_conf.db.password,
    database: db_conf.db.database
});



exports.up = function(next){
    db.connect(function(err) {
        if (err) throw err
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
                db.end();
                next();
            }
        );
            
    });
};


exports.down = function(next){
    db.connection(function(err) {
        if (err) throw err
        db.query(
            "DROP TABLE IF EXISTS user",
            function(err) { 
                if (err) console.log(err);
                db.end();
                next();
            }
        );
    })
};
