var db = require('../middleware/db.js').db;


exports.up = function(next){
   db.query(
   		'ALTER TABLE photo'
   		+ 'ADD COLUMN processed INT(1) DEFAULT 0'
   	, function(err) {
   		if(err) throw err;
   	});
   db.query(
   		'ALTER TABLE photo'
   		+ 'ADD COLUMN approved INT(1) DEFAULT 0'
   	, function(err) {
   		if(err) throw err;
   	});        
   next();
};


exports.down = function(next){

   next();
};