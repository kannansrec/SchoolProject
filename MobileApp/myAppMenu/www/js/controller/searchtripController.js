cortrollerModule.controller('SearchTripController', function($scope, $ionicModal, $timeout, $http, $state, $rootScope) {



  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
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
    var searchDate = getSQLDate ($scope.searchData.date);
    var searchTrip_no = $scope.searchData.trip_name;
    if (searchVehicle_no == '' || searchVehicle_no == undefined) {
      searchVehicle_no = "null";
    }
    if (searchTrip_no == '' || searchTrip_no == undefined) {
      searchTrip_no = "null";
    }

    $http.get($rootScope.baseURL + '/api/trip_details/date/' + searchDate + '/trip_no/' + searchTrip_no + '/vehicle/' + searchVehicle_no)

    .success(function(data) {
      $scope.records = data;
    //  $state.go("searchtrip.triplist");
    })
      .error(function(data) {
        alert('Error while searching trip list: ' + data);
        console.log('Error: ' + data);
      });
  }

})
