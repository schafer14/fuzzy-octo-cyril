var db = require('../middleware/db.js').db;



exports.up = function(next){

    db.query(
        "CREATE TABLE IF NOT EXISTS users_collections (" 
        + "user_id INT(10) NOT NULL, " 
        + "collection_id INT(10) NOT NULL) ",
        + "is_owner INT(1) NOT NULL DEFAULT 0) ",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
            
   
};


exports.down = function(next){
    
    db.query(
        "DROP TABLE IF EXISTS users_collections",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
   
};