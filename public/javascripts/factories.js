snap.factory('PhotoFactory', function($http) {
	factory = {};

	factory.getPhotos = function(cb) {
 		$http({method: 'GET', url: '/api/photos'}).
			success(function(data, status, headers, config) {
				return cb(data.photos);
			}).
			error(function(data, status, headers, config) {	
				console.log(data);
			});
	}

	factory.processed = function(cb) {
		$http({method: 'GET', url: '/api/processed'}).
		success(function(data) {
			return cb(data);
		}).
		error(function(data) {
			console.log(data)
		});
	}

	factory.approve = function(id, approved, cb) {
		var good = approved == 'accept' ? 1 : 0;
		$http({method: 'POST', url: '/api/photos/' + id + '/approved', data: {approved: approved}}).
		success(function(data) {
			return cb(data);
		}).
		error(function(data) {
			console.log(data)
		});
	}


	return factory;
})

snap.factory('CollectionFactory', function($http) {
	factory = {};

	factory.getCollections = function(cb) {
		$http({method: 'GET', url:'/api/collections'}).
			success(function(data, status, headers, config) {
				return cb(data.collections);
			}).
			error(function(data, status, headers, config) {
				console.log(data);
			})
	}

	// Returns two params
	factory.get = function(id, cb) {
		$http({method: 'GET', url:'/api/collections/' + id}).
			success(function(data, status, headers, config) {
				return cb(data.collection, data.photos);
			}).
			error(function(data, status, headers, config) {
				console.log(data);
			})
	}

	factory.create = function(input, cb) {
		$http({method: 'POST', url:'/api/collections', data: {
			name: input.name,
			desc: input.desc
		}}).success(function(data) {
			return cb(data);
		}). error(function(data) {
			console.log(data);
		})
	}

	return factory;

})

snap.factory('TagFactory', function($http) {
	factory = {};

	factory.getTags = function(cb) {
		$http({method: 'GET', url:'/api/tags'}).
			success(function(data, status, headers, config) {
				return cb(data.tags);
			}).
			error(function(data, status, headers, config) {
				console.log(data);
			})
	}

	factory.get = function(id, cb) {
		$http({method: 'GET', url:'/api/tags/' + id}).
			success(function(data, status, headers, config) {
				return cb(data.tag, data.photos);
			}).
			error(function(data, status, headers, config) {
				console.log(data);
			})
	}

	factory.create = function(photo_id, tag_name, cb) {
		$http({method: 'POST', url:'/api/tags', data: {
			photo_id: photo_id,
			tag_name: tag_name
		}}).
		success(function(data) {
			cb(data)
		}).
		error(function(data) {
			console.log(data)
		});
	}
	return factory;

})

snap.factory('ArtistFactory', function($http) {
	factory = {};

	factory.getArtists = function(cb) {
		$http({method: 'GET', url:'/api/artists'}).
			success(function(data, status, headers, config) {
				return cb(data.artists);
			}).
			error(function(data, status, headers, config) {
				console.log(data);
			})
	}

	factory.get = function(id, cb) {
		$http({method: 'GET', url:'/api/artists/' + id}).
		success(function(data, status, headers, config) {
			return cb(data.artist);
		}).
		error(function(data, status, headers, config) {
			console.log(data);
		})
	}

	factory.collections = function(id, cb) {
		$http({method: 'GET', url:'/api/artists/' + id + '/collections'}).
		success(function(data){
			return cb(data.collections);
		}).
		error(function(data) {
			console.log(data)
		})
	}

	factory.register = function(reg, cb) {
		$http({method: 'POST', url: '/api/artists', data: {
			name: reg.name,
			email: reg.email,
			pass: reg.pass
		}}).
		success(function(data) {
			return cb(null, data);
		}).
		error(function(data) {
			return cb(data);
		})
	}

	factory.login = function(auth, cb) {
		$http({method: 'POST', url: '/api/login', data: {
			email: auth.email,
			pass: auth.password
		}}).
		success(function(data) {
			return cb(data);
		}).
		error(function(data) {
			console.log('data', data);
		})
	}

	factory.logout = function(cb) {
		$http({method: 'GET', url: '/api/logout'}).
		success(function(data) {
			return cb(data);
		}).
		error(function(data) {
			return cb(data);
		})
	}

	factory.session = function(cb) {
		$http({method: 'GET', url:'/api/session'}).
		success(function(user) {
			return cb(user);
		}).
		error(function(data) {
			console.log(data);
		})
	}

	return factory;

})