angular.module('dttw.menu', [])

.config(['$stateProvider',function($stateProvider) {
	$stateProvider.state('menu', {
      url: '/menu',
      controller: 'MenuCtrl',
      templateUrl: 'src/menu/menu.html'
    });
}])

.controller('MenuCtrl', ['$scope', '$state', '$localStorage', function($scope, $state, $localStorage) {
	$scope.onPlayTap = function () {
		$state.go('game');
	};
	if(!$localStorage.highScore){
		$scope.highScore = 0;
	}else{
		$scope.highScore = $localStorage.highScore;
	}
}]);
