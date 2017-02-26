angular.module('starter.controllers', [])

.controller('BibleCtrl', function($scope, $state, settings, $rootScope) {
	$scope.bible = [ "New Testament", "Old Testament" ];
	$rootScope.title = "Shona Bible";

	$scope.changePage = function(choice) {
		$state.go('tab.books', {
			testament : choice
		});
	};

	$scope.curStyle = settings.getStyle();
	$scope.$on('css:changed', function() {
		$scope.curStyle = settings.getStyle();
	});
})

.controller('BibleBooksCtrl',
		function($scope, $stateParams, getBible, $state, settings, $rootScope) {

			if ($stateParams.testament == "New Testament") {
				$rootScope.title = "New Testament Books";
				getBible.newTestament().then(function(books) {
					$scope.bible = books;
				});
			} else if ($stateParams.testament == "Old Testament") {
				$rootScope.title = "Old Testament Books";
				$scope.bible = getBible.oldTestament().then(function(books) {
					$scope.bible = books;
				});
			} else {
				$state.go('tab.chapters', {
					book : $stateParams.testament
				});
			}

			$scope.changePage = function(book) {
				$state.go('tab.chapters', {
					book : book
				});
			};

			$scope.curStyle = settings.getStyle();
			$scope.$on('css:changed', function() {
				$scope.curStyle = settings.getStyle();
			});
		})

.controller(
		'BibleChaptersCtrl',
		function($scope, $stateParams, getBible, $state, settings, $rootScope) {
			$rootScope.title = $stateParams.book;
			if (getBible.isBibleLoaded()
					&& getBible.currentBook() == $stateParams.book) {
				$scope.fullBook = getBible.Bible();
			} else {
				getBible.getBook($stateParams.book).then(function(fullBook) {
					$scope.fullBook = fullBook;
				});
			}

			$scope.changePage = function(book, chapter) {
				$state.go('tab.text', {
					book : book,
					chapter : chapter
				});
			};

			$scope.curStyle = settings.getStyle();
			$scope.$on('css:changed', function() {
				$scope.curStyle = settings.getStyle();
			});

		})

.controller(
		'BibleTextCtrl',
		function($window, $location, $scope, $stateParams, getBible, settings,
				$rootScope) {

			$rootScope.title = $stateParams.book + ' Chapter: '
					+ $stateParams.chapter;

			if (!getBible.isBibleLoaded()) {
				console.log($stateParams);
				console.log(getBible.isBibleLoaded());
				getBible.getBook($stateParams.book).then(
						function(fullBook) {
							$scope.fullChapter = getBible
									.getChapter($stateParams.chapter);
						});
			} else {
				$scope.fullChapter = getBible.getChapter($stateParams.chapter);
			}

			$scope.goodText = function(text) {
				return text;
			};

			$scope.curStyle = settings.getStyle();
			$scope.$on('css:changed', function() {
				$scope.curStyle = settings.getStyle();
			});

		})

.controller('SettingsCtrl',
		function($scope, settings, $localStorage, $rootScope) {
			$rootScope.title = "Settings";
			if ($localStorage.nightMode) {
				$scope.nMod = {
					nightMode : true
				};
			} else {
				$scope.nMod = {
					nightMode : false
				};
			}

			$scope.them = 'bar-stable';

			$scope.curStyle = settings.getStyle();

			var sizeer = 16;

			$scope.$watch("nMod.nightMode", function(newValue, oldValue) {
				if ($scope.nMod.nightMode) {
					$scope.them = 'bar-dark';
				} else {
					$scope.them = 'bar-stable';
				}
				$scope.curStyle = settings.setStyle(newValue);
				$localStorage.nightMode = $scope.nMod.nightMode;
			});

			$scope.plusSize = function() {
				$scope.curStyle = settings.incTextSize();
			};

			$scope.minSize = function() {
				$scope.curStyle = settings.decTextSize();
			};
		});
