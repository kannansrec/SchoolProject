 var app = angular.module('myapp', []);
 app.controller('myctrl', function($scope) {
     $scope.name = "test data";
 });

 app.controller('vechileController', function($scope) {
    
     $scope.vehicles = [{
         id: "1",
         type: "van",
         name: "TN-37-N-0001"
     }, {
         id: "2",
         type: "van",
         name: "TN-37-N-0002"
     }, {
         id: "3",
         type: "cab",
         name: "TN-37-N-0003"
     }, {
         id: "4",
         type: "bus",
         name: "TN-37-N-0004"
     }];
     
     $scope.trips = [{
         id: "1",
         name: "Trip 1"
     }, {
         id: "2",
         name: "Trip 2"
     }, {
         id: "3",
         name: "Trip 3"
     }, {
         id: "4",
         name: "Trip 4"
     }];
     
     $scope.drivers = [{
         id: "1",
         name: "Ramu"
     }, {
         id: "2",
         name: "Muthu"
     }, {
         id: "3",
         name: "Kumar"
     }, {
         id: "4",
         name: "Sachin"
     }];
 });

function isNumber(evt) {
        var iKeyCode = (evt.which) ? evt.which : evt.keyCode
        if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
            return false;

        return true;
    }    