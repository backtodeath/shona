(function() {
	'use strict';

	angular
			.module('serieAApp')
			.controller('SerieAController', SerieAController);
	
	SerieAController.$inject = ['$rootScope', '$localStorage', 'dataService', '$http', '$scope'];
	
	function SerieAController($rootScope, $localStorage, dataService, $http, $scope) {	
		var defaultUrl = 'http://soccer.sportsopendata.net';
		var SCORES_SERVICE_URL = 'http://soccer.sportsopendata.net/v1/leagues/serie-a/seasons/16-17/standings';
		var refreshTimeDelay = 1000;
		var continousLoad;
		$scope.currentSeason = '16-17';
		// User agent displayed in home page
		$scope.userAgent = navigator.userAgent;
	
		// Needed for the loading screen
		$rootScope.$on('$routeChangeStart', function() {
			$rootScope.loading = true;
		});
	
		$rootScope.$on('$routeChangeSuccess', function() {
			$rootScope.loading = false;
		});
	
		var status = false;
		isInternet();
		loadData();
		
		
		$scope.getSeason = function(season) {
			$scope.currentSeason = season;
			loadData();
		}
		
		var getSeasonUrl = function(season){
			return 'http://soccer.sportsopendata.net/v1/leagues/serie-a/seasons/' + season + '/standings';
		}
	
		function isInternet() {
			dataService
					.getData(defaultUrl)
					.then(
							function(dataResponse) {
								if (dataResponse.status >= 200
										&& dataResponse.status < 304) {
									console.log("dataResponse status = " + dataResponse.status);
									status = true;
								} else {
									status = false;
								}
							});
		}
	
		function loadData() {
			if (status) {
				$http({
					method : "GET",
					url : getSeasonUrl($scope.currentSeason)
				})
						.then(
								function mySucces(response) {
									var data = response.data.data.standings;
									$scope.scoreData = parseData(data);
									$localStorage.scData = $scope.scoreData;
									$scope.netConnectivity = 0; // CONNECTED!
								},
								function myError(response) {
									console
											.log("ERROR STATUS = "
													+ response.statusText);
									$scope.netConnectivity = 1; // CONNECTION
									// ERROR
									continousLoad = setTimeout(
											loadData,
											refreshTimeDelay);
								});
			} else {
				if ($localStorage.scData != null) {
					$scope.netConnectivity = 2; // NOT CONNECTED
												// AND
					// RETRIEVE PAST
					// DATA IF EXISTS
					$scope.scoreData = $localStorage.scData;
				} else { // NOT CONNECTED TRY TO CONNECT TO
							// THE
					// INTERNET
					$scope.netConnectivity = 3;
					clearInterval(continousLoad);
					continousLoad = setTimeout(loadData,
							refreshTimeDelay);
				}
			}
		}
	
		function parseData(data) {
			angular.forEach(data, function(team) {
				if (team.position < 4) {
					team.color = 'green';
				} else if (team.position > 3
						&& team.position < 6) {
					team.color = 'yellow';
				} else if (team.position > 17) {
					team.color = 'red';
				} else {
					team.color = 'default';
				}
			})
			return data;
		}
	}
})();