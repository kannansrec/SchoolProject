cortrollerModule.controller('LoginController', function($scope, $ionicModal, $timeout, $http, $state, $rootScope) {



  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
   //live 
   $rootScope.baseURL= "http://192.168.4.253:8090";//school
  // $rootScope.baseURL= "http://10.195.3.71:8080";    
   //$rootScope.baseURL= "http://192.168.0.101:8080";    
   // $rootScope.baseURL= "http://localhost:8080";    
  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.loginData.userName = "test@gmail.com";
    $scope.loginData.password = "1";
    console.log('Doing login :', $scope.loginData);
    $http({
      url: $rootScope.baseURL+'/api/users/login',
      method: 'POST',
      data: $scope.loginData,
      headers: {
        "Content-Type": "application/text"
      }

    }).success(function(data) {
      if (data == "Invalid Username or Password"){
          alert("Provide a valid Username / Password");
      }
      else{
      $rootScope.loginData = data[0];
      $scope.loginData = {};
      //Load Initial data
      $scope.initialsetup();
      $state.go("dashboard");
      }
    }).error(function(err1) {
      alert("Provide a valid Username / Password");
    });

  };

  $scope.initialsetup = function() {
    $scope.getSupportingRecords('driver_info');
    $scope.getSupportingRecords('vehicle_details');
    $scope.getSupportingRecords('trips');
    $rootScope.hrmin = {
      hstep: [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      mstep: [0, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59 ]
    };
  }

  $scope.getSupportingRecords = function(tablename) {
    $http({
      url: $rootScope.baseURL+'/api/' + tablename,
      method: 'GET',
      //data : $scope.tableData,
      headers: {
        "Content-Type": "application/text"
      }
    })
      .success(function(table_data) {
        switch (tablename) {
          case 'driver_info':
            $rootScope.drivers = table_data;
            break;
          case 'trips':
            $rootScope.trips = table_data;
            break;
          case 'vehicle_details':
            $rootScope.vehicles = table_data;
            break;
          default:
            break;
        }
        //console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
})
