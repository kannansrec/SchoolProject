cortrollerModule.controller('UpdateTripController', ['$http', '$scope', '$rootScope', '$stateParams', '$state',
  function($http, $scope, $rootScope, $stateParams, $state) {
    $scope.formData = {};
    $scope.tempData = {};
    $scope.options = $rootScope.hrmin;
    $scope.formData = $stateParams.record;   
    $scope.trips = $rootScope.trips;
    $scope.drivers = $rootScope.drivers;
    $scope.vehicles = $rootScope.vehicles;
    $scope.splitedText = $scope.formData.leaving_time.split(":");
    $scope.tempData.outhr = Number($scope.splitedText[0]);
    $scope.tempData.outmin = Number($scope.splitedText[1]);
    if ($scope.formData.entering_time == undefined) {
      $scope.tempData.inhr = new Date().getHours();
      $scope.tempData.inmin = new Date().getMinutes();
    } else {
      $scope.splitedText1 = $scope.formData.entering_time.split(":");
      $scope.tempData.inhr = Number($scope.splitedText1[0]);
      $scope.tempData.inmin = Number($scope.splitedText1[1]);
    }
      
      $scope.test = function() { 
          alert("First Entry");
      };

    $scope.updateRecord = function() {
      if ($scope.formData.end_km > $scope.formData.start_km) {
        //if($scope.tempData.inhr >=  $scope.tempData.outhr){
        $scope.formData.total_km = $scope.formData.end_km - $scope.formData.start_km;
        $scope.formData.entering_time = $scope.tempData.inhr + ':' + $scope.tempData.inmin;
          $http({
          url: $rootScope.baseURL+'/api/trip_details/' + $scope.formData.id,
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


  }
]);
