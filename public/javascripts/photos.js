var snap = angular.module('snap', []);


snap.controller('photoController', function($scope, PhotoFactory) {
	PhotoFactory.getPhotos(function(photos) {
		$scope.photos = photos;
	});
})

snap.factory('PhotoFactory', function($http) {
	factory = {}

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