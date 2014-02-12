var db = require('../middleware/db').db;
var bcrypt = require('bcrypt-nodejs');
var Photo = require('./Photo');
var Collection = require('./Collection');


module.exports = User;

function User(obj) {
    for(key in obj) {
        this[key] = obj[key];
    }
}

User.prototype.save = function(cb) {
    this.name = this.name || '';
    if (!this.email) return cb(new Error('Must have an email address'));
    if (!this.pass) return cb(new Error('Must have a password'));
    this.img = this.img || '';
    this.description = this.description || '';
    if (!this.salt) User.salt(this, function() {});


    var query = 'INSERT INTO user (name, email, password, img, description, salt) ' 
        + 'values (?, ?, ?, ?, ?, ?)';

    var params = [this.name, this.email, this.pass, this.img, this.description, this.salt];

    db.query(query, 
        params,
        function(err, rows) {
            if (err) return cb(err);
            cb(null, rows.insertId);
        }
    );
};

User.find = function(id, cb) {
    var query = 'SELECT * '
        + 'FROM user '
        + 'WHERE id = ?';

    db.query(query, id, function(err, rows) {
        if (err) return cb(err);
        rows[0].pass = rows[0].password;
        delete rows[0].password;
        cb(null, new User(rows[0]));
    });
};


User.prototype.toJSON = function() {
    return {
        id: this.id,
        name: this.name,
        email: this.email,
        img: this.img,
        description: this.description
    };
}

User.salt = function(user, cb) {
    var salt = user.salt || '';
    if (!salt) {
        bcrypt.genSalt(16, function(err, saltInit) {
            if (err) return cb(err);
            user.salt = saltInit;
            cb();
        })
    } else {
        cb();
    }
}

User.prototype.hash = function(cb) {
    if (!this.salt) return cb(new Error('Must use salt'));

    var user = this;

    bcrypt.hash(
        user.pass, 
        user.salt,
        null, 
        function(err, hash) {
            if (err) return cb(err);
            user.pass = hash;
            cb();
        }
    );
}

User.prototype.auth = function(cred, cb) {
    User.get({email: cred.email}, function(err, users) {
        var user = users[0];
        bcrypt.compare(cred.pass, user.pass, function(err, match) {
            if (err) return cb(err);
            if (!match) return cb(new Error('Invalid credentials'));
            return cb(null, user);
        });
    });
}

User.get = function(opt, cb) {
    var wheres = '';
    var params = [];
    var first = true;
    var users = [];

    for (var val in opt) {
        if (first) {
            wheres += ' WHERE ' + val + '=? ';
            params.push(opt[val]);
            first = false;
        } else {
            wheres += ' AND ' + val + '=? ';
            params.push(opt[val]);
        }
    }

    var query = 'SELECT * '
        + 'FROM user '
        + wheres;

    db.query(query, params, function(err, rows) {
        if (err) return cb(err);
        for (var index in rows) {
            rows[index].pass = rows[index].password;
            delete rows[index].password;
            users.push(new User(rows[index]));
        }
        cb(null, users);
    });
}

User.prototype.collections = function(cb) {
    var colls = [];
    var query = 'SELECT * '
        + 'FROM collection '
        + 'JOIN users_collections '
        + 'ON collection_id = collection.id '
        + 'WHERE user_id = ?;'

    db.query(query, this.id, function(err, rows) {
        if (err) return cb(err);
        for (index in rows) {
            colls.push(new Photo(rows[index]))
        }
        cb(null, colls);
    })
}

User.prototype.photos = function(cb) {
    var photos = [];
    var query = 'SELECT * FROM photo WHERE user_id=?';

    db.query(query, this.id, function(err, rows) {
        if (err) return cb(err);
        for(index in rows) {
            photos.push(new Photo(rows[index]));
        }
        cb(null, photos);
    })
}

User.all = function(cb) {
    var users = [];
    var query = 'SELECT * FROM user';

    db.query(query, function(err, rows) {
        if (err) return cb(err);
        for(index in rows) {
            users.push(new User(rows[index]));
        }
        cb(null, users);
    })
}