var Photo = require('../model/Photo.js');
var should = require('should');

describe('Photo', function() {
	describe('.Photo()', function() {
		it('should create a new photo object', function() {
			var photo = new Photo({
				name: 'Tobi the Ferret',
				description: 'Tobis first birthday', 
				price: 2,
				path: '/path to file',
				ext: 'jpg'
			});

			photo.name.should.equal('Tobi the Ferret');
			photo.description.should.equal('Tobis first birthday');
			photo.price.should.equal(2);
			photo.path.should.equal('/path to file');
			photo.ext.should.equal('jpg');
		})
	})
	describe('Photo.find()', function() {
		it('should find a photo given an id', function() {
			Photo.find(1, function(err, photo) {
				photo.name.should.equal('Ali and I');
				photo.description.should.equal('Ali and I on the Oregon coast');
				photo.price.should.equal(42);
				photo.path.should.equal('https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-frc3/t1/420595_10151416460752291_1952561250_n.jpg');
				photo.ext.should.equal('jpg');
				photo.user_id.should.equal(1);
				photo.collection_id.should.equal(1);
				photo.should.have.property('created_at');
			})
		})
	})
	describe('Photo.all()', function() {
		it('should return all the photos', function() {
			Photo.count(function(err, num) {
				if (err) throw err;
				Photo.all(function(err, photos) {
					if (err) throw err;
					photos.length.should.equal(num);
					photos[0].should.be.an.instanceOf(Photo);
				})
			})
		})
	})
})