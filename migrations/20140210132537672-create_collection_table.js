var db = require('../middleware/db.js').db;



exports.up = function(next){

    db.query(
        "CREATE TABLE IF NOT EXISTS collection (" 
        + "id INT(10) NOT NULL AUTO_INCREMENT, " 
        + "name VARCHAR(128) NOT NULL, " 
        + "description LONGTEXT,"
        + "cover_photo VARCHAR(128),"
        + "owner_id INT(10) UNSIGNED,"
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
        "DROP TABLE IF EXISTS collection",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
   
};
