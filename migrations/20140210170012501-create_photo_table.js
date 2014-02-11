var db = require('../middleware/db.js').db;



exports.up = function(next){

    db.query(
        "CREATE TABLE IF NOT EXISTS photo (" 
        + "id INT(10) NOT NULL AUTO_INCREMENT, " 
        + "name VARCHAR(128) NOT NULL, " 
        + "description LONGTEXT, " 
        + "price INT(10), " 
        + "path VARCHAR(128) NOT NULL, " 
        + "ext VARCHAR(128) NOT NULL, " 
        + "user_id INT(10) NOT NULL, " 
        + "collection_id INT(10) NOT NULL, " 
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
        "DROP TABLE IF EXISTS photo",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
   
};