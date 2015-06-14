/*
contains the angular.js core javascript file for running on client side
*/

var app = angular.module('myapp', []);
app.controller('myctrl',function($scope, $http) {
        $scope.formData = { id:'DRV1234' + new Date().getSeconds(), driver_name: 'testData', driver_licence_no : '21312' , driver_mobile_no : '123', driver_address:'asdas',tablename: document.getElementById('tablename')};
        
        tablename=tablename.value;
      
        // when the page is loaded, invoke this to display data

    $http.get('/api/'+tablename)
            .success(function(data) {
                $scope.records = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
  
    

    
    
        $scope.getRecords = function(tablname) {
//         tablename ='driver_info';
        $http.get('/api/'+tablename)
            .success(function(data) {
                $scope.records = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
     };
    	
        // when submitting the add form, send the text to the node API
        $scope.createRecord = function(tablename) {
            $http.post('/api/'+tablename, $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.records = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

//         delete a record on clicking trash icon
//         @params tablename: name of the table
//         @params id: id key value to be deleted
        $scope.deleteRecord = function(tablename, id) {
            $http.delete('/api/'+tablename+'/'+ id)
                .success(function(data) {
                   // $scope.records = data;
                    $scope.getRecords(tablename);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
        
        
        // Update a todo after checking it
        $scope.updateRecord = function(tablename,id,id_data) {
            $scope.formData = id_data;
            alert("tablename:"+tablename+", id: "+id+"id_data:"+id_data.value);
//            $http.post('/api/'+tablename+'/' + id ,$scope.formData)
//                .success(function(data) {
//                    $scope.records = data;
//                })
//                .error(function(data) {
//                    console.log('Error: ' + data);
//                });
        };

    
        });
    
    