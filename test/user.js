var User = require('../model/User.js');
var should = require('should');

describe('User', function() {

	describe('.User()', function() {
		it('should create a new user', function() {
			var user = new User ({
				name: 'Tobi',
				type: 'Ferret',
				pass: 'pass'
			});

			user.name.should.equal('Tobi');
			user.type.should.equal('Ferret');
			user.pass.should.equal('pass');
		})
	})

	describe('User.find()', function() {
		it('should return data from a user', function() {
			User.find(1, function(user) {
				user.name.should.equal('Banner B Schafer');
				user.email.should.equal('banner.schafer@gmail.com');
				user.should.have.properties('pass');
				user.created_at.should.be.ok;
			});
		})
	})

	// THESE TEST TAKE TO LONG

	// describe('User.hash()', function() {
	// 	it('should hash the users pass field', function() {
	// 		var user = new User({pass: '12345', salt: '$2a$16$XCj./CbJVLJaGe6Gv6Ivv.'});
	// 		user.hash(function(err) {
	// 			if (err) throw err;
	// 			user.pass.should.not.equal('12345');
	// 		});
	// 	})
	// 	it('should return an error if salt is not provided', function() {
	// 		var user = new User({pass: '12345'});
	// 		user.hash(function(err) {
	// 			err.should.be.okay;
	// 			err.message.should.equal('Must use salt');
	// 		});
	// 	})
	// })

	describe('User.salt(user)', function() {
		it('should add salt to user if none exists', function() {
			var user = new User({pass: '12345'});
			User.salt(user, function() {
				user.salt.should.be.okay;
			});
		})
		it('should not change salt if salt exists', function() {
			var user = new User({salt: 'This is my salt'});
			User.salt(user, function() {
				user.salt.should.equal('This is my salt');
			});
		})
	})

	describe('User.authenticate()', function() {
		it('should match passwords', function() {
			var cred = {
				email: 'banner.schafer@gmail.com',
				pass: 'pass'
			}

			User.find(1, function(user) {
				user.auth(cred, function(err, user) {
					if (err) throw err;
					user.should.be.okay;
				});
			});
		})
		it('should not validate incorrect passwords', function() {
			var cred = {
				email: 'banner.schafer@gmail.com',
				pass: 'incorrect'
			}

			User.find(1, function(user) {
				user.auth(cred, function(err, user) {
					err.should.be.okay;
					err.message.should.equal('Invalid credentials');
				});
			});

		})
	})

	describe('User.get(opts)', function() {
		it('should get user by email', function() {
			User.get({email: 'banner.schafer@gmail.com'}, function(err, users) {
				var user = users[0];
				user.should.be.okay;
				user.id.should.equal(1);
			})
		})
	})
	
})



