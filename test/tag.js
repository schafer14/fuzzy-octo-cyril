var Tag = require('../model/Tag.js');
var should = require('should');

describe('Tag', function() {
	describe('.Tag()', function() {
		it('should create a new tag', function() {
			var tag = new Tag ({
				name: 'Dogs'
			});

			tag.name.should.equal('Dogs');
		})
	})

	describe('Tag.find', function() {
		it('should find a tag by id', function() {
			Tag.find(1, function(err, tag) {
				if (err) throw err;
				tag.name.should.equal('Dogs');
			})
		})
	})

	describe('Tag.all', function() {
		it('should return all tags', function() {
			Tag.count(function(err, num) {
				Tag.all(function(err, tags) {
					tags.length.should.equal(num);
					tags[0].should.be.an.instanceOf(Tag);
				})
			})
		})
	})
})