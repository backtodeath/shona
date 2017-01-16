angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngStorage'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: function ($scope, settings) {
          $scope.$on('css:changed', function () {
            if (settings.getNight()) {
              $scope.them = 'positive tabs-dark';
            } else {
              $scope.them = 'active-positive';
            }
          });
        }
      })

      .state('tab.salvation', {
        url: '/salvation',
        views: {
          'tab-salvation': {
            templateUrl: 'templates/tab-salvation.html',
            controller: 'SalvationCtrl'
          }
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
        },
      	data: {title: ":book"}
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

    $urlRouterProvider.otherwise('/tab/salvation');
    
    var buttonEvent = function(e) {
        if ( e.keyName == "back" ) {
        	tizen.application.getCurrentApplication().exit();
        }
    }
    
    document.addEventListener( 'tizenhwkey', buttonEvent );

  });
