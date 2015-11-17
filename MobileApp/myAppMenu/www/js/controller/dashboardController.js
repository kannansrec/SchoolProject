cortrollerModule.controller('DashboardController', function($scope, $ionicModal, $timeout, $http, $state, $rootScope) {



  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $rootScope.loginData;
  $scope.search = {};

  function getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate() - 3);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  var newDate = getYesterdaysDate();
  todayTripList(newDate, true);
    
  function todayTripList(newDate,isRefresh) {
    $http.get($rootScope.baseURL + '/api/trip_details/date/' + newDate)
      .success(function(data) {
        $scope.records = data;
        if(isRefresh == true){
        $state.go("dashboard.triplist");
        }
        
      })
      .error(function(data) {
        alert('Error while getting  today trip list: ' + data);
        console.log('Error: ' + data);
      });
  }

  $scope.deleteRecord = function(tablename, id) {
    $http.delete($rootScope.baseURL + '/api/' + tablename + '/' + id)
      .success(function(data) {
        todayTripList(newDate, false);
        //$state.go("dashboard");
        
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
})
