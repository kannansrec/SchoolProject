    var express = require('express');
    var app = express(); // create our app w/ express
    var mysql = require('mysql'); // mongoose for mongodb
    var morgan = require('morgan'); // log requests to the console (express4)
    var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    var allowCrossDomain = function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Key");
        res.header("Access-Control-Allow-Methods", "PUT,POST, GET, OPTIONS,DELETE");
        next();
    }

    // configuration =================
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'support',
        database: 'transport'
    });
    connection.connect(function(err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting to the database :" + err + " \n\n");
        }
    })


    app.use(express.static('public'));
    // app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
    app.use(morgan('dev')); // log every request to the console
    app.use(bodyParser.urlencoded({
        'extended': 'true'
    })); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({
        type: 'application/vnd.api+json'
    })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(allowCrossDomain);
    // app.use(express.errorHandler());

    // routes ======================================================================
    // api ---------------------------------------------------------------------
    // get all todos

    app.get("/api/:tablename", function(req, res) {
        console.log("Table Requested using 'GET' was:" + req.params.tablename);
        console.log("and number of params received:" + req.params.length);
        var tablename = req.params.tablename;
        var strQuery = "select * from " + tablename;
        connection.query(strQuery, function(err, rows, fields) {
            if (!err) {
                console.log(rows);
                res.json(rows);
            } else {
                res.send(err);
                console.log('Error while performing Query.');
            }
            //connection.end();
        });
    });

    // get last trip end KM of the vehicle
    app.get("/api/:tablename/vehicle/:vehicle_no", function(req, res) {
        console.log("Table Requested using 'GET' was:" + req.params.tablename);
        var tablename = req.params.tablename;
        var vehicle_no = req.params.vehicle_no;
        var strQuery = "select end_km from " + tablename + " where vehicle_no=" + vehicle_no + " order by id desc limit 1";
        connection.query(strQuery, function(err, rows, fields) {
            if (!err) {
                console.log(rows);
                res.json(rows);
            } else {
                res.send(err);
                console.log('Error while performing Query.');
            }
            //connection.end();
        });
    });


    app.get("/api/:tablename/date/:today/trip_no/:trip_no/vehicle/:vehicle_no", function(req, res) {
        console.log("Table Requested using 'GET' was:" + req.params.tablename);
        var tablename = req.params.tablename;
        var today = req.params.today;
        var trip_no = req.params.trip_no;
        var vehicle_no = req.params.vehicle_no;
        console.log("Date :" + today + "Trip No: " + trip_no + "Vehicle No:" + vehicle_no);
        var strQuery = "select * from " + tablename + " where "
        if (today != "null")
        {
            strQuery = strQuery +" date='" + today + "'";
            //and trip_name='" + trip_no + "' and vehicle_no='" + vehicle_no + "'";
        } 
        if (trip_no != "null") {
            if (strQuery.indexOf("=") !=-1) {
                strQuery = strQuery + " and trip_name='" + trip_no+"'" ;
            } else {
                strQuery = strQuery + " trip_name='" + trip_no+"'";
            }

        } 
        if (vehicle_no != "null") {
            if (strQuery.indexOf("=") !=-1) {
                strQuery = strQuery + " and vehicle_no=" + vehicle_no ;
            } else {
                strQuery = strQuery + " vehicle_no=" + vehicle_no ;
            }

        }
        console.log(strQuery);
        connection.query(strQuery, function(err, rows, fields) {
            if (!err) {
                console.log(rows);
                res.json(rows);
            } else {
                res.send(err);
                console.log('Error while performing Query.');
            }
            //connection.end();
        });
    });
    //get trip details of today's Date
    app.get("/api/:tablename/date/:today", function(req, res) {
        console.log("Table Requested using 'GET' was:" + req.params.tablename);
        var tablename = req.params.tablename;
        var today = req.params.today;
        console.log(today);
        var strQuery = "select * from " + tablename + " where date>='" + today + "'";
        console.log(strQuery);
        connection.query(strQuery, function(err, rows, fields) {
            if (!err) {
                console.log(rows);
                res.json(rows);
            } else {
                res.send(err);
                console.log('Error while performing Query.');
            }
            //connection.end();
        });
    });


    // Insert a record to DB
    app.post('/api/:tablename', function(req, res) {
        // create a todo, information comes from AJAX request from Angular
        var jsonString = '';
        req.on('data', function(data) {
            console.log(" data : " + data);
            jsonString += data;
        });
        req.on('end', function() {
            var input = JSON.parse(jsonString);
            var tablename = req.params.tablename;
            console.log("Tablename :" + tablename);
            //   var input = JSON.parse(JSON.stringify(req.body));
            console.log("Input Created" + input);
            var strQuery = "INSERT INTO " + tablename + " set ? ";
            connection.query(strQuery, input, function(err, rows) {
                if (err) {
                    console.log("ERROR MSG:" + err);
                    res.send("Error Occured :" + err);
                } else {
                    console.log("Insert Success :");
                    res.json(rows); //
                    //res.redirect("/api/" + tablename);
                }
            });
        });
    });

    //Validate username and password
    app.post('/api/:tablename/login', function(req, res) {
        var jsonString = '';
        req.on('data', function(data) {
            console.log(" data : " + data);
            jsonString += data;
        });
        req.on('end', function() {
            var input = JSON.parse(jsonString);
            var user = input.userName;
            var pass = input.password;
            var tablename = req.params.tablename;
            console.log("Tablename :" + tablename);
            console.log("userName :" + user); // + "input.UserName"+input.userName );
            console.log("Password :" + pass); // + "input.password "+input.password );
            var strQuery = "SELECT * FROM " + tablename + " where user_email='" + user + "' and password ='" + pass + "'";
            connection.query(strQuery, input, function(err, rows) {
                if (err) {
                    console.log("ERROR MSG:" + err);
                    res.send("Error Occured :" + err);
                } else if (rows.length > 0) {
                    console.log("password validation Success :");
                    console.log(rows);
                    res.json(rows); //
                } else {
                    res.send("Invalid Username or Password");
                }
            });
        });
    });

    //Update a record in DB
    app.post('/api/:tablename/:id', function(req, res) {
        // create a todo, information comes from AJAX request from Angular
        var jsonString = '';
        req.on('data', function(data) {
            console.log(" data : " + data);
            jsonString += data;
        });
        req.on('end', function() {
            var input = JSON.parse(jsonString);
            var tablename = req.params.tablename;
            var id = req.params.id;
            var data = {};
            if (tablename == 'trip_details') {
                data = {
                    entering_time: input.entering_time,
                    end_km: input.end_km,
                    total_km: input.total_km,
                };
            } else if (tablename == 'users') {
                data = {
                    user_name: input.user_name,
                    password: input.password,
                    address: input.address,
                };
            }

            connection.query("UPDATE " + tablename + " set ? WHERE id = ? ", [data, id], function(err, rows) {
                if (err) {
                    console.log("ERROR MSG:" + err);
                    res.send("Error Occured :" + err);
                } else {
                    console.log("Update Success :");
                    res.json(rows);
                }
            });
        });
    });

    // Delete a record from DB
    app.delete('/api/:tablename/:id', function(req, res) {
        var id = req.params.id;
        var tablename = req.params.tablename;
        console.log("Table Name:" + tablename + "Id:" + id)
        //req.getConnection(function(err, connection) {
        connection.query("DELETE FROM " + tablename + "  WHERE id = ? ", [id], function(err, rows) {
            if (err)
                console.log("Error deleting : %s ", err);
            else {
                console.log("Record Deleted Successfully");
                res.send("SUCCESS");
            }
            //res.redirect("/api/"+tablename);
        });
        //});
    });


    // application -------------------------------------------------------------

    app.get('/', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");