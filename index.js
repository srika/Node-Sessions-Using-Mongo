var express = require('express');
var mongoose = require('mongoose');
//Pull information from the HTML POST
var bodyParser = require('body-parser');
var sessions = require('express-session');
var MongoStore = require('connect-mongo')(sessions);


var app = express();

// Connect to MongoDB
var options = {
    user: 'myTester',
    pass: 'xyz123',
    useNewUrlParser: true
}
mongoose.connect('mongodb://localhost:27017/ecommercedb', options);
var db = mongoose.connection;

//Handle MongoDB Error
db.on('error', console.error.bind(console,'There is some error!'));
db.once('open', function(){
    console.log('We are connected!!');
})

//use sessions for tracking user logins
app.use(sessions({
    secret: 'sssshhhh',
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
//parse application/json
app.use(bodyParser.json());


//Defining routes here
/* app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html');
}); */

//Serves static file from template
app.use(express.static(__dirname + '/views'));

//Include Routes
var routes = require('./routes/router');
app.use('/', routes);




app.listen(3000, function(){
    console.log('Server is running at port 3000!!!');
})