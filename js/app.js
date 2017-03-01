angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: function ($scope, settings, $localStorage, $ionicModal) {
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
          
          $scope.getApps = function() {
        	  $scope.modal.hide();
      		var service = new tizen.ApplicationControl(
      				"http://tizen.org/appcontrol/operation/view",
      				"tizenstore://SellerApps/rz71xjklxj", null, null, null);
      		var id = "org.tizen.tizenstore";

      		try {
      			tizen.application.launchAppControl(service, id, function() {
      				console.log("Service launched");
      			}, function(err) {
      				alert("Service launch failed: " + " " + err.message);
      			}, null);
      		} catch (exc) {
      			alert("launchService exc: " + exc.message);
      		}
      	}
          
          $ionicModal.fromTemplateUrl('templates/modal.html', {
        	    scope: $scope
        	  }).then(function(modal) {
        	    $scope.modal = modal;
        	  });
          
          $scope.exit = function() {
         		tizen.application.getCurrentApplication().exit();
         	}
          
          var buttonEvent = function(e) {
      		if (e.keyName == "back") {
      			$scope.modal.show();
      		}
      	}
          
          document.addEventListener( 'tizenhwkey', buttonEvent );
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
  });
