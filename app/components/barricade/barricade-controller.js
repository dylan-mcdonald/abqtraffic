app.controller("BarricadeController", ["$scope", "barricades", "$routeParams", function($scope, barricades, $routeParams) {
	barricades.success(function(data) {
		$scope.detail = data.features[$routeParams.id];
		$scope.populateGoogleMap();
	});

	$scope.googleMap = null;

	$scope.loadGoogleMap = function() {
		$scope.googleMap = new google.maps.Map(document.getElementById("googleMap"), {
			zoom: 12,
			center: new google.maps.LatLng(35.1107, -106.61)
		});
	};

	$scope.populateGoogleMap = function() {
		if($scope.googleMap === null) {
			$scope.loadGoogleMap();
		}

		$scope.detail.geometry.paths.forEach(function(outerPath) {
			var line = [];
			outerPath.forEach(function(path) {
				var latLng = new google.maps.LatLng(path[1], path[0]);
				line.push(latLng);
			});

			var fullPath = new google.maps.Polyline({
				path: line,
				geodesic: true,
				map: $scope.googleMap,
				strokeColor: "red",
				strokeOpacity: 1.0,
				strokeWeight: 4
			});
		});
	};
}]);