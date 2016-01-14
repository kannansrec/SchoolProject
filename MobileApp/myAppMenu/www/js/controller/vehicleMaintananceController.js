cortrollerModule.controller('VehicleMaintainanceController', ['$http', '$scope', '$rootScope', '$stateParams', '$state',
  function($http, $scope, $rootScope, $stateParams, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the user modal
    $scope.loginData = $rootScope.loginData;
    $scope.search = {};

    function getYesterdaysDate() {
      var date = new Date();
      date.setDate(date.getDate());
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    var newDate = getYesterdaysDate();
    recentMaintananceList(newDate, true);

    function recentMaintananceList(newDate, isRefresh) {
      $http.get($rootScope.baseURL + '/api/vehicle_maintainance/date/' + newDate)
        .success(function(data) {
          $scope.records = data;
          if (isRefresh == true) {
            $state.go("vehiclemaintainance.maintainancelist");
          }
        })
        .error(function(data) {
          alert('Error while getting  today maintanance list: ' + data);
          console.log('Error: ' + data);
        });
    }

    $scope.deleteRecord = function(tablename, id) {
      $http.delete($rootScope.baseURL + '/api/' + tablename + '/' + id)
        .success(function(data) {
          recentMaintananceList(newDate, false);
          //$state.go("dashboard");
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  }
]);
