angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage'])
  .config(function ($stateProvider, $urlRouterProvider, $uibModal) {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: function ($scope, settings, $localStorage) {
        	if($localStorage.nightMode){
            	$scope.nMod = {nightMode: $localStorage.nightMode}
            	 $scope.them = 'bar-dark';
            	 $scope.curStyle = settings.setStyle(true);
            }else{
            	$scope.nMod = {nightMode: false}
            	 $scope.them = 'bar-stable';
            	 $scope.curStyle = settings.setStyle(false);
            }
        	
          $scope.$on('css:changed', function () {
            if (settings.getNight()) {
              $scope.them = 'positive tabs-dark';
            } else {
              $scope.them = 'active-positive';
            }
          });
        }
      })

      .state('tab.bible', {
        url: '/bible',
        views: {
          'tab-bible': {
            templateUrl: 'templates/tab-bible.html',
            controller: 'BibleCtrl'
          }
        }
      })
      .state('tab.books', {
        url: '/bible/:testament',
        views: {
          'tab-bible': {
            templateUrl: 'templates/book.html',
            controller: 'BibleBooksCtrl'
          }
        }
      })

      .state('tab.chapters', {
        url: '/bible/:book',
        views: {
          'tab-bible': {
            templateUrl: 'templates/chapter.html',
            controller: 'BibleChaptersCtrl'
          }
        }
      })

      .state('tab.text', {
        url: '/bible/:book/:chapter',
        views: {
          'tab-bible': {
            templateUrl: 'templates/text.html',
            controller: 'BibleTextCtrl'
          }
        }
      })

      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/tab-settings.html',
            controller: 'SettingsCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/bible');
   
    
    var buttonEvent = function(e) {
		if (e.keyName == "back") {
			modalInstance = $uibModal.open({
		          animation: true,
		          template: '',
		          resolve: {
		            params: function() {
		              return params;
		            }
		          }
		        });
			if (confirm('Realy want to exit?')) {
				tizen.application.getCurrentApplication().exit();
			}
		}
	}

	document.addEventListener('tizenhwkey', buttonEvent);
  });
