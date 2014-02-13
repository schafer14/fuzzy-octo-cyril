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

	return factory;

})