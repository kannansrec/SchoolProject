/*
contains the angular.js core javascript file for running on client side
*/

var app = angular.module('myapp', ['ui.bootstrap']);

app.controller('menu', function($scope) {
    $scope.menudata = [{
        name: "Transport"
    }, {
        name: "Drives"
    }, {
        name: "Trip"
    }, {
        name: "Vehicles"
    }];
});


//app.controller('timeCtrl', function($scope, $log) {
//    $scope.mytime = new Date();
//    $scope.hstep = 1;
//    $scope.mstep = 1;
//    $scope.ismeridian = true;
//    $scope.changed = function() {
//        $log.log('Time changed to: ' + $scope.mytime);
//    };
//    



//    $scope.toggleMode = function() {
//        $scope.ismeridian = !$scope.ismeridian;
//    };

//    $scope.update = function() {
//        var d = new Date();
//        d.setHours(14);
//        d.setMinutes(0);
//        $scope.mytime = d;
//    };



//    $scope.clear = function() {
//        $scope.mytime = null;
//    };
//});



app.controller('myctrl', function($scope, $http) {
    $scope.hidediv= true;
    $scope.options = {
        hstep: [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        mstep: [0, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 5, 59, ]
    };
    // $scope.outhr={};
    //    $scope.outmin={};
    $scope.tempData = {};
    $scope.dataFromDB = {};
    $scope.menudata = [{
        name: "Transport"
    }, {
        name: "Drives"
    }, {
        name: "Trip"
    }, {
        name: "Vehicles"
    }];

    $scope.vehicles = {};
    $scope.trips = {};
    $scope.drivers = {};
    $scope.showNewDialog = false;
    $scope.formData = {};
    $scope.showNewContent = function() {
        $scope.showNewDialog = true;
        $scope.formData.date = new Date();
        $scope.getSupportingRecords('driver_info', 'drivers');
        $scope.getSupportingRecords('vehicle_details', 'vehicles');
        $scope.getSupportingRecords('trips', 'trips');
    };
    $scope.hideNewContent = function() {
        $scope.showNewDialog = false;
    };

    //tablename=tablename.value;

    // when the page is loaded, invoke this to display data

    $http.get('/api/trip_details ')
        .success(function(data) {
            $scope.records = data;
            //  console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.getSupportingRecords = function(tablename, scopeVariable) {
        $http.get('/api/' + tablename)
            .success(function(data) {
                switch (tablename) {
                    case 'driver_info':
                        $scope.drivers = data;
                        break;
                    case 'trips':
                        $scope.trips = data;
                        break;
                    case 'vehicle_details':
                        $scope.vehicles = data;
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

    $scope.getVehicleEndKM = function(vehicle_no) {
        tablename = 'trip_details';
        $http.get('/api/' + tablename + '/' + vehicle_no)
            .success(function(data) {
                $scope.records = data;
            if( $scope.records[0] != undefined && $scope.records[0].end_km != null){
                $scope.formData.start_km = $scope.records[0].end_km;
            }
                for (vehicle in $scope.vehicles) {
                    if ($scope.vehicles[vehicle].id == vehicle_no) {
                        $scope.formData.driver_id = $scope.vehicles[vehicle].driver_id;
                    }
                }
                //  console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    $scope.getRecords = function(tablename) {
        //         tablename ='driver_info';
        $http.get('/api/' + tablename)
            .success(function(data) {
                $scope.records = data;
                //  console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // when submitting the add form, send the text to the node API
    $scope.createRecord = function(tablename) {
        $scope.formData.total_km = $scope.formData.end_km - $scope.formData.start_km;
        $scope.formData.leaving_time = $scope.tempData.outhr + ':' + $scope.tempData.outmin;
        $scope.formData.date = moment().format('YYYY-MM-DD HH:mm:ss'); //new Date().toISOString().replace('T', ' ').substr(0, 19);
        // '2015-06-25 18:18:48.672Z' new Date().toISOString().split("T")[0];        
        $http.post('/api/' + tablename, $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.records = data;
                $scope.hideNewContent();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //         delete a record on clicking trash icon
    //         @params tablename: name of the table
    //         @params id: id key value to be deleted
    $scope.deleteRecord = function(tablename, id) {
        $http.delete('/api/' + tablename + '/' + id)
            .success(function(data) {
                // $scope.records = data;
                $scope.getRecords(tablename);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // Update a todo after checking it
    $scope.updateRecord = function(tablename, id, id_data) {
        $scope.formData = id_data;
        alert("tablename:" + tablename + ", id: " + id + "id_data:" + id_data.value);
        //            $http.post('/api/'+tablename+'/' + id ,$scope.formData)
        //                .success(function(data) {
        //                    $scope.records = data;
        //                })
        //                .error(function(data) {
        //                    console.log('Error: ' + data);
        //                });
    };


});

app.controller('vechileController', function($scope) {


});

function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}


//< script >
//
//app.controller('
//               MainCtrl ', function($scope, $rootScope, ngDialog) {
//    $rootScope.jsonData = ' {
//                    "foo": "bar"
//                }
//                ';
//    $rootScope.theme = '
//                ngdialog - theme -
//                default ';
//    $scope.open = function() {
//        ngDialog.open({
//            template: '
//                firstDialogId ',
//            controller: '
//                InsideCtrl '
//        });
//    };
//
//    $scope.openDefault = function() {
//        ngDialog.open({
//            template: '
//                firstDialogId ',
//            controller: '
//                InsideCtrl ',
//            className: '
//                ngdialog - theme -
//                default '
//        });
//    };
//
//    $scope.openPlain = function() {
//        $rootScope.theme = '
//                ngdialog - theme - plain ';
//        ngDialog.open({
//            template: '
//                firstDialogId ',
//            controller: '
//                InsideCtrl ',
//            className: '
//                ngdialog - theme - plain '
//        });
//    };
//    $scope.openTemplate = function() {
//
//        $scope.value = true;
//        ngDialog.open({
//            template: '
//                externalTemplate.html ',
//            className: '
//                ngdialog - theme - plain ',
//            scope: $scope
//        });
//    }
//});
//app.controller('
//                InsideCtrl ', function($scope, ngDialog) {
//    $scope.openSecond = function() {
//        ngDialog.open({
//            template: ' < h3 > < a href = ""
//                ng - click = "closeSecond()" > Close all by click here! < /a></h3 > ',
//            plain: true,
//            closeByEscape: false,
//            controller: '
//                SecondModalCtrl '
//        });
//    };
//});
//app.controller('
//                SecondModalCtrl ', function($scope, ngDialog) {
//    $scope.closeSecond = function() {
//        ngDialog.close();
//    };
//}); < /script>