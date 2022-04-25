const express = require('express');
//const connection = require('./database/mysql');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/admin');

const app = express();
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json());

//app.use(adminRoute);

app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

// connection.connect( error => {
//     if(error) throw error;
//     console.log('Database Run!');
// });


app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});