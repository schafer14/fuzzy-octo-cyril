var Collection = require('../model/Collection.js');
var should = require('should');

describe('Collection', function() {
	describe('.Collection()', function() {
		it('should create a new collection', function() {
			var coll = new Collection ({
				name: 'Bend Mountains',
				description: 'The Mountains of Bend OR.',
				photo: 'path/to/photo'
			});

			coll.name.should.equal('Bend Mountains');
			coll.description.should.equal('The Mountains of Bend OR.');
			coll.photo.should.equal('path/to/photo');
		})
	})

	describe('Collection.find()', function() {
		it('should find a collection by id', function() {
			Collection.find(1, function(err, coll) {
				coll.name.should.equal('Bend OR');
				coll.description.should.equal('My Bend photos');
				coll.photo.should.equal('http://www.mikeputnamphoto.com/wp-content/uploads/2009/05/broken-top-basin.jpg');
				coll.created_at.should.be.ok;
			})
		})
	})

	describe('Collection.all()', function() {
		it('should return all collections', function() {
			Collection.count(function(err, num) {
				if (err) throw err;
				Collection.all(function(err, colls) {
					if (err) throw err;
					colls.length.should.equal(num);
				})
			})
		})
	})

	describe('Collection.set()', function() {
		it('should return a set of :length with :start', function() {
			var length = 6;
			var from = 1;
			Collection.set(from, length, function(err, colls) {
				if (err) throw err;
				colls.length.should.be.below(length);
				colls[0].should.be.instanceOf(Collection);
			})
		})
	})
})