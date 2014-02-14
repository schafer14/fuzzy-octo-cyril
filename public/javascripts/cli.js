var snap = angular.module('snap', []);

snap.controller('appController', function($scope, CollectionFactory, TagFactory, ArtistFactory, PhotoFactory) {

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

		PhotoFactory.getPhotos(function(photos) {
			$scope.photos = photos;
		});
	}

	$scope.collectionRoute = function(id) {
		CollectionFactory.get(id, function(coll, photos) {
			$scope.state = {
				page: 'photo',
				name: coll.name
			}
			$scope.photos = photos;
		})
	}

	$scope.tagRoute = function(id) {
		TagFactory.get(id, function(tag, photos) {
			$scope.state = {
				page: 'photo',
				name: tag.name
			}
			$scope.photos = photos;
		})
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

