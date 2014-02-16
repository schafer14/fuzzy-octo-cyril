var snap = angular.module('snap', []);

snap.controller('appController', function($scope, CollectionFactory, TagFactory, ArtistFactory, PhotoFactory) {
	$scope.auth = {};
	$scope.reg = {};
	$scope.msg = [];
	$scope.currUser = {};

	getCurrUser();


	function getCurrUser() {
		ArtistFactory.session(function(data) {
			if (data) {
				$scope.currUser = data.user
			}
		})
	}

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

	$scope.registerUser = function() {
		$scope.reg.authenticate(function(err) {
			if (err) {
				$scope.logError(err.type, err.msg);
			} else {
				ArtistFactory.register($scope.reg, function(err, data) {
					if (err) {
						$scope.msg.push({'type': err.type, 'msg': err.msg});
					} else {
						$scope.logError(data.type, data.msg);
					}
				})	
			}
		})

	}

	$scope.logout = function() {
		ArtistFactory.logout(function(err) {
			if (!err) {
				delete $scope.currUser;
			}
		})
	}

	$scope.logError = function(type, msg) {
		if (type && msg) {
			$scope.msg.push({type: type, msg: msg});
		}
	}

	$scope.reg.authenticate = function(cb) {
		if ($scope.reg.pass != $scope.reg.confPass) {
			cb({type: 'bg-danger', msg: 'Password does not match password confirmation'}, null);
			$scope.reg.pass = $scope.reg.confPass = '';
		}  
		if (!$scope.reg.email) {
			cb({type: 'bg-warning', msg: 'Email is required'});
		} 
		if (!$scope.reg.pass) {
			cb({type: 'bg-warning', msg: 'Password is required'});
		}

		if ($scope.reg.pass == $scope.reg.confPass && $scope.reg.email && $scope.reg.pass) {
			cb(null);
		}
	} 

	$scope.loginUser = function() {
		ArtistFactory.login($scope.auth, function(msg) {
			$scope.logError(msg.type, msg.msg);
			if(msg.user) {
				$scope.currUser = msg.user;
			}
		})
	}

	$scope.$watch('msg.length', function() {
		if ($scope.msg.length) {
			setInterval(function() {
				$scope.$apply(function() {
					$scope.msg.splice(0, 1);
				});
			}, 5000)
		}
	});

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

