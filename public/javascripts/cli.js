var snap = angular.module('snap', []);

snap.controller('appController', function($scope, CollectionFactory, TagFactory, ArtistFactory, PhotoFactory) {
	PhotoFactory.getPhotos(function(photos) {
		$scope.photos = photos;
	});

	$scope.state = {
		page: 'photo',
		name: 'Photos'
	};

	$scope.artistRoute = function(id) {
		$scope.state = {
			page: 'artist',
			name: 'Artist'
		};

		ArtistFactory.get(id, function(artist) {
			$scope.state.name = artist.name;
			$scope.artist = artist;
			ArtistFactory.collections(id, function(collections) {
				$scope.artist.collections = collections
			})
		});

	}

	$scope.photoRoute = function() {
		$scope.state = {
			page: 'photo',
			name: 'Photos'
		}
	}

	$scope.collectionRoute = function(id) {
		CollectionFactory.get(id, function(coll, photos) {
			$scope.state = {
				page: 'photo',
				name: coll.name
			}
			console.log($scope.photos)
			$scope.photos = photos;
			console.log($scope.photos)
		})
	}

	$scope.tagRoute = function(id) {
		console.log('Tag', id)
	}

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

