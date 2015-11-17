angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl'
    })
        
      
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('newTrip', {
      url: '/newtrip',
      templateUrl: 'templates/newTrip.html',
      controller: 'newTripCtrl'
    })
        
      
    
      
        
    .state('searchTrip', {
      url: '/searchtrip',
      templateUrl: 'templates/searchTrip.html',
      controller: 'searchTripCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('updateTripInfo', {
      url: '/updatetrip',
      templateUrl: 'templates/updateTripInfo.html',
      controller: 'updateTripInfoCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dashboard');

});