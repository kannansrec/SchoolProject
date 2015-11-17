cortrollerModule.controller('UserController', ['$http', '$scope', '$rootScope', '$stateParams', '$state',
  function($http, $scope, $rootScope, $stateParams, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the user modal
    $scope.userData = {};
    $scope.userData = $rootScope.loginData;
    $scope.updateUserInfo = function() {

      $http({
        url: $rootScope.baseURL + '/api/users/' + $scope.userData.id,
        method: 'POST',
        data: $scope.userData,
        headers: {
          "Content-Type": "application/text"
        }
      })
        .success(function(data) {
          alert("update success");
          $state.go("dashboard");
        })
        .error(function(data) {
          console.log('Error: ' + data);
          alert("Error While Updating User Info");
        });

    };


    $scope.logoutUser = function() {
      $rootScope.loginData = {};
      $state.go("login");
    };

  }
]);
