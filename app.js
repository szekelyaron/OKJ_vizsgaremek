const path = require('path');
const express = require('express');
const app = express();
const errorController = require('./controllers/error');
const bodyParser = require('body-parser');

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

app.listen(6969, () => console.log('Listening at port 6969'));