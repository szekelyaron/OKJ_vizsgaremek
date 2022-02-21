const path = require('path');
const express = require('express');
const app = express();
const errorController = require('./controllers/error');
const bodyParser = require('body-parser');
var db = require('./models/db.js');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const mainRoutes = require('./routes/main');

app.use(mainRoutes);

app.use(errorController.get404);

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({
  extended: true
}));// Body parser use JSON data

var db = require('./models/db.js');

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({
  extended: true
}));// Body parser use JSON data

db.createPool(); //create a global sql pool connection

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
    user: 'carscope.site@gmail.com',
    pass: 'Carscope2022'
}
});

app.listen(2001, () => console.log('2001 - es porton fut'));
