var User = require('../model/User.js');
var should = require('should');
var mock;

describe('User', function() {
	before(function() {
		// MOCK DB
	})

	beforeEach(function() {
		//Clear DB
	})

	after(function () {
		mock.restore();
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

	describe('.save()', function() {
		var uid;
		it('should run save on a user', function() {
			var user = new User ({
				name: 'Test Case 1',
				email: 't1@example.com',
				pass: 'pass',
				img: 'path/to/img.jpg'
			});
			user.save(function(id) {
				id.should.be.ok;
				var uid = id;
			});
		})
		it('should save the user', function() {
			var ret = User.find(uid);
			ret.should.be.ok;
			ret.should.have.property('description');
			ret.name.should.equal('Test Case 1');
			ret.email.should.equal('t1@example.com');
		})
		it('should hash the password', function() {
			var ret = User.find(uid);
			ret.pass.should.not.equal('pass');
		})
		it('should disallow non-unique emails', function() {
			var user = new User({
				name: 'Test Case 2',
				email: 't1@example.com',
				pass: 'pass',
			});

			user.save(function(uid) {

			}).should.throw();
		})
		it('should require email and password', function() {
			var user = new User({
				name: 'Test Case 3',
				email: 't2@example.com'
			});

			var user2 = new User({
				pass: 'pass'
			});

			user.var(function(uid) {}).should.throw();
			user2.var(function(uid) {}).should.throw();
		})
		it('should create dates for updated_at and created_at', function() {
			var user = User.find(uid);
			user.created_at.should.be.ok;
			user.updated_at.should.be.ok;
		})
	})

	
})


//  MOCKING
// it("returns the return value from the original function", function () {
//     var myAPI = { method: function () {} };
//     var mock = sinon.mock(myAPI);
//     mock.expects("method").once().returns(42);

//     var proxy = once(myAPI.method);

//     assert.equals(proxy(), 42);
//     mock.verify();
// });

