cortrollerModule.controller('NewTripController', ['$http', '$scope', '$rootScope', '$stateParams', '$state',
  function($http, $scope, $rootScope, $stateParams, $state) {
    $scope.loginData = {};
    $scope.formData = {};
    $scope.tempData = {};
    $scope.formData.date = new Date();
    $scope.options = $rootScope.hrmin;
    $scope.trips = $rootScope.trips;
    $scope.drivers = $rootScope.drivers;
    $scope.vehicles = $rootScope.vehicles;
    $scope.tempData.outhr = new Date().getHours();
    $scope.tempData.outmin = new Date().getMinutes();


    $scope.createRecord = function(tablename) {
      var tablename = 'trip_details';
      //$scope.formData.total_km = $scope.formData.end_km - $scope.formData.start_km;
      $scope.formData.leaving_time = $scope.tempData.outhr + ':' + $scope.tempData.outmin;
      $scope.formData.date = moment().format('YYYY-MM-DD');
      $http({
        url: $rootScope.baseURL+'/api/' + tablename,
        method: 'POST',
        data: $scope.formData,
        headers: {
          "Content-Type": "application/text"
        }
      })
        .success(function(data) {
          //  $scope.formData = {}; // clear the form so our user is ready to enter another
          // $scope.records = data;
          $state.go("dashboard");
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.getVehicleEndKM = function(vehicle_no) {
      var tablename = 'trip_details';
      $http.get($rootScope.baseURL+'/api/' + tablename + '/vehicle/' + vehicle_no)
        .success(function(data) {
          $scope.vehiclesData = data;
          if ($scope.vehiclesData[0] != undefined && $scope.vehiclesData[0].end_km != null) {
            $scope.formData.start_km = $scope.vehiclesData[0].end_km;
          }
          for (vehicle in $scope.vehicles) {
            if ($scope.vehicles[vehicle].id == vehicle_no) {
              $scope.formData.driver_id = $scope.vehicles[vehicle].driver_id;
            }
          }
          //  console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  }
]);
