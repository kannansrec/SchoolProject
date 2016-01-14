cortrollerModule.controller('NewMaintainanceController', ['$http', '$scope', '$rootScope', '$stateParams', '$state',
    function($http, $scope, $rootScope, $stateParams, $state) {

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});


      $scope.loginData = {};
      $scope.formData = {};
      $scope.fuelDetails = {};
      $scope.tempData = {};
      $scope.formData.date = new Date();

      $scope.drivers = $rootScope.drivers;
      $scope.vehicles = $rootScope.vehicles;
      $scope.maintainancetype = [{
        value: "Fuel"
      }, {
        value: "Service"
      }];
      $scope.getFuelAmount = function() {
        // var tablename = "fuel_details" ;
        $http({
          url: $rootScope.baseURL + '/api/fuel_details',
          method: 'GET',
          //data : $scope.tableData,
          headers: {
            "Content-Type": "application/text"
          }
        })
          .success(function(table_data) {
            $scope.fuelDetails = table_data;
            $scope.formData.price_per_liter = $scope.fuelDetails[0].fuel_price;  
            $scope.formData.fuel_type = $scope.fuelDetails[0].fuel_type;
           //  alert("Diesel Price : "+ $scope.formData.fuelPrice );                  
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      }
        
  $scope.createRecord = function(tablename) {
    var tablename = 'vehicle_maintainance';
    //$scope.formData.total_km = $scope.formData.end_km - $scope.formData.start_km;
  //  if (validateFields()) {
      if ($scope.formData.end_km == null || $scope.formData.end_km > $scope.formData.start_km) {
        if ($scope.formData.end_km == null) {
          $scope.formData.total_km = null;
        }

        $scope.formData.date = moment().format('YYYY-MM-DD');
        $http({
          url: $rootScope.baseURL + '/api/' + tablename,
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
      } else {
        alert("End KM cannot be less than start KM");
      }
    //}
  };


  $scope.validateFields = function() {
    if ($scope.formData.vehicle_no != null) {
      if ($scope.formData.maintainance_type != null) {
        if ($scope.formData.driver_id != null) {
          if ($scope.formData.end_km == null || $scope.formData.end_km > $scope.formData.start_km) {
            if ($scope.formData.fuel_quantity != null) {
              return true;
            } else {
              alert("Please enter qualtity");
              return false;
            }

          } else {
            alert("End KM cannot be less than start KM");
            return false;
          }
        } else {
          alert("Please select Driver");
          return false;
        }

      } else {
        alert("Please select Maintainance");
        return false;
      }
    } else {
      alert("Please select vehicle no");
      return false;
    }
  };

  $scope.calculateTotalKm = function(vehicle_no) {
    $scope.formData.total_km = $scope.formData.end_km - $scope.formData.start_km;
  };
        
  $scope.calculateTotalAmount = function() {
    $scope.formData.maintainance_amount = ( $scope.formData.price_per_liter * $scope.formData.fuel_quantity );
  };

  $scope.getVehicleEndKM = function(vehicle_no) {
    var tablename = 'vehicle_maintainance';
    $http.get($rootScope.baseURL + '/api/' + tablename + '/vehicle/' + vehicle_no)
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
  $scope.getFuelAmount();                        

}]);
