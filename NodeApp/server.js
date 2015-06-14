    var express = require('express');
    var app = express(); // create our app w/ express
    var mysql = require('mysql'); // mongoose for mongodb
    var morgan = require('morgan'); // log requests to the console (express4)
    var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'transport'
    });
    connection.connect(function(err) {
        if (!err) {
            console.log("Database is connected ... \n\n");
        } else {
            console.log("Error connecting to the database :"+err+" \n\n");
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

    // routes ======================================================================
    // api ---------------------------------------------------------------------
    // get all todos
    app.get("/api/:tablename", function(req, res) {
        console.log("Table Requested was:"+req.params.tablename);
        var tablename = req.params.tablename;
        var strQuery = "select * from "+tablename;
        connection.query(strQuery, function(err, rows, fields) {
            if (!err) {
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
        var input = JSON.parse(JSON.stringify(req.body));
        console.log("INput Created" + input);
        var tablename = req.params.tablename;
        connection.query("INSERT INTO "+tablename+" set ? ", input, function(err, rows) {
            if (err) {
                console.log("ERROR MSG:" + err);
                res.send("Error Occured :" + err);
            } else {
                console.log("Insert Success :");
                res.redirect("/api/"+tablename);
            }
        });
    });

    //Update a record in DB
    app.post('/api/:tablename/:id', function(req, res) {
     // create a todo, information comes from AJAX request from Angular
        var id = req.params.id;
        var tablename = req.params.tablename;
        var input = JSON.parse(JSON.stringify(req.body));
        connection.query("UPDATE "+tablename+" set ? WHERE id = ? ",[input,id], function(err, rows){
            if (err) {
                console.log("ERROR MSG:" + err);
                res.send("Error Occured :" + err);
            } else {
                console.log("Update Success :");
                res.redirect("/api/"+tablename);
            }
        });
    });

    // Delete a record from DB
    app.delete('/api/:tablename/:id', function(req, res) {
        var id = req.params.id;
        var tablename = req.params.tablename;
        console.log("Table Name:"+tablename+"Id:"+ id)
        //req.getConnection(function(err, connection) {
        connection.query("DELETE FROM "+tablename+"  WHERE id = ? ", [id], function(err, rows) {
            if (err)
                console.log("Error deleting : %s ", err);
           else{
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
    app.listen(3000);
    console.log("App listening on port 3000");