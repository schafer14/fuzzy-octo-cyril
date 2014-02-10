var User = require('../model/User.js');
var should = require('should');

describe('User', function() {
	before(function() {
		// MOCK DB
	})

	beforeEach(function() {
		//Clear DB
	})

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

	
})