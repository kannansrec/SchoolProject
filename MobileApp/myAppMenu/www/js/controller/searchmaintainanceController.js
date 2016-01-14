
cortrollerModule.controller('SearchMaintainanceController', ['$http', '$scope', '$rootScope', '$stateParams', '$state',
  function($http, $scope, $rootScope, $stateParams, $state) {

  $scope.searchData = {
    //      'vehicle_no': '',
    //      'trip_name': ''
  };

  function getSQLDate(date ) {
    //var date = new Date();
    // date.setDate(date.getDate() - 3);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
   var todate = new Date();
   var todayDate = new Date(todate.getFullYear(),todate.getMonth(),todate.getDate());//getTodaysDate();

  $scope.searchData.date = todayDate;

  $scope.searchFun = function() {
    var searchVehicle_no = $scope.searchData.vehicle_no;
    if($scope.searchData.date != null ){
      var searchDate = getSQLDate ($scope.searchData.date);     
    } 
    var searchTrip_no = $scope.searchData.trip_name;
    if (searchVehicle_no == '' || searchVehicle_no == undefined) {
      searchVehicle_no = "null";
    }
    if (searchTrip_no == '' || searchTrip_no == undefined) {
      searchTrip_no = "null";
    }

    $http.get($rootScope.baseURL + '/api/vehicle_maintainance/date/' + searchDate + '/vehicle/' + searchVehicle_no)

    .success(function(data) {
      $scope.records = data;
    //  $state.go("searchtrip.triplist");
    })
      .error(function(data) {
        alert('Error while searching trip list: ' + data);
        console.log('Error: ' + data);
      });
  }
  }
]);
