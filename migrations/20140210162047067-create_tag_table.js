var db = require('../middleware/db.js').db;



exports.up = function(next){

    db.query(
        "CREATE TABLE IF NOT EXISTS tag (" 
        + "id INT(10) NOT NULL AUTO_INCREMENT, " 
        + "name VARCHAR(128) NOT NULL, " 
        + "PRIMARY KEY(id))",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
            
   
};


exports.down = function(next){
    
    db.query(
        "DROP TABLE IF EXISTS tag",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
   
};
