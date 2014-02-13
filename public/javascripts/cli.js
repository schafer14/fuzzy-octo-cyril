var snap = angular.module('snap', []);


snap.controller('photoController', function($scope, PhotoFactory) {
	PhotoFactory.getPhotos(function(photos) {
		$scope.photos = photos;
	});
})


snap.controller('appController', function($scope, CollectionFactory, TagFactory, ArtistFactory) {
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
				console.log(collections)
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

