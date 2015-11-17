// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var cortrollerModule = angular.module('starter.controllers', []);

angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
//      .state('app', {
//        url: '/app',
//        //  abstract: true,
//        views: {
//          'main': {
//            templateUrl: 'templates/login.html',
//            controller: 'BaseController'
//          }
//        }
//      })

    .state('login', {
      url: '/login',
      views: {
        'main': {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
        }
      }
    })

    .state('signup', {
      url: '/signup',
      views: {
        'main': {
          templateUrl: 'templates/signup.html',
          controller: 'SignupController'
        }
      }
    })

    .state('logout', {
      url: '/logout',
      views: {
        'main': {
          templateUrl: 'templates/login.html',
          controller: 'LoginController'
        }
      }
    })

    .state('dashboard', {
      url: '/dashboard',
      views: {
        'main': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardController'
        }
      }
    })
    
    .state('dashboard.triplist', {
      url: '/triplist',
      views: {
        'trip-list': {
          templateUrl: 'templates/tripList.html'     
        }
      }
    })


    .state('userinfo', {
      url: '/userinfo',
      views: {
        'main': {
          templateUrl: 'templates/userInfo.html',
          controller: 'UserController'
        }
      }
    })
      .state('newtrip', {
        url: '/newtrip',
        views: {
          'main': {
            templateUrl: 'templates/newTrip.html',
            controller: 'NewTripController'
          }
        }
      })
      .state('searchtrip', {
        url: '/searchtrip',
        views: {
          'main': {
            templateUrl: 'templates/searchTrip.html',
            controller: 'SearchTripController'
          }
        }
      })
    
    .state('searchtrip.triplist', {
      url: '/triplist',
      views: {
        'trip-list': {
          templateUrl: 'templates/tripList.html'     
        }
      }
    })

    .state('updatetrip', {
      url: '/updatetrip',
      views: {
        'main': {
              templateUrl: 'templates/updateTrip.html',
              controller: 'UpdateTripController'
                }
      },
      params : {
			'record' : null
		}
      
    })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  });
