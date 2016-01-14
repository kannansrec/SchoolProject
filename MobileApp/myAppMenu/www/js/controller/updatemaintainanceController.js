cortrollerModule.controller('UpdateMaintainanceController', ['$http', '$scope', '$rootScope', '$stateParams', '$state',
  function($http, $scope, $rootScope, $stateParams, $state) {
    $scope.formData = {};
    $scope.maintainancetype = [{
      value: "Fuel"
    }, {
      value: "Service"
    }];
    $scope.trips = $rootScope.trips;
    $scope.drivers = $rootScope.drivers;
    $scope.vehicles = $rootScope.vehicles;
    $scope.formData = $stateParams.record;


    $scope.updateRecord = function() {
      if ($scope.formData.end_km > $scope.formData.start_km) {
        //if($scope.tempData.inhr >=  $scope.tempData.outhr){
        $scope.formData.total_km = $scope.formData.end_km - $scope.formData.start_km;
        $http({
          url: $rootScope.baseURL + '/api/vehicle_maintainance/' + $scope.formData.id,
          method: 'POST',
          data: $scope.formData,
          headers: {
            "Content-Type": "application/text"
          }
        })
          .success(function(data) {
            //alert("update success");
            $state.go("dashboard");
            //   $scope.records = data;
            //  $scope.getRecords(tablename);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
        //    }
        //            else{
        //                alert("Data Not saved, In time should be greater than Out time");
        //            }
      } else {
        alert("Data Not save ,End Km is less than Start Km, Please check the Data");
      }
    };

    $scope.calculateTotalKm = function(vehicle_no) {
      $scope.formData.total_km = $scope.formData.end_km - $scope.formData.start_km;
    };
    $scope.calculateTotalAmount = function() {
    $scope.formData.maintainance_amount = ( $scope.formData.price_per_liter * $scope.formData.fuel_quantity );
  };
  }
]);
