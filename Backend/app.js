const express = require('express');
const connection = require('./database/mysql');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/admin');

const app = express();
app.use(bodyParser.json());

app.use(adminRoute);

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

connection.connect( error => {
    if(error) throw error;
    console.log('Database Run!');
});


app.listen(3000, () => {
    console.log('Server Fun');
});