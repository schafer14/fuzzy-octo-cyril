var snap = angular.module('snap', []);


snap.controller('photoController', function($scope, PhotoFactory) {
	PhotoFactory.getPhotos(function(photos) {
		$scope.photos = photos;
	});
})

snap.controller('appController', function($scope, CollectionFactory, TagFactory, ArtistFactory) {
	CollectionFactory.getCollections(function(colls) {
		$scope.colls = colls;
	});

	TagFactory.getTags(function(tags) {
		$scope.tags = tags;
	});

	ArtistFactory.getArtists(function(artists) {
		$scope.artists = artists
	});
})

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
	return factory;

})