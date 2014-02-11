var db = require('../middleware/db.js').db;



exports.up = function(next){

    db.query(
        "CREATE TABLE IF NOT EXISTS photos_tags (" 
        + "photo_id INT(10) NOT NULL, " 
        + "tag_id INT(10) NOT NULL) ",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
            
   
};


exports.down = function(next){
    
    db.query(
        "DROP TABLE IF EXISTS photos_tags",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
   
};