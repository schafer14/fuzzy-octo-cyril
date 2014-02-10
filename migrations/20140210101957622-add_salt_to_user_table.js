var db = require('../middleware/db.js').db;


exports.up = function(next){
  	db.query(
        "ALTER TABLE user ADD salt VARCHAR(32) NOT NULL DEFAULT 0 AFTER password",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
};

exports.down = function(next){
  	db.query(
        "ALTER TABLE user DROP salt",
        function(err) { 
            if (err) console.log(err);
            next();
        }
    );
};
