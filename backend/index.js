const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 3003;


app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(session({
  secret: 'tezzaract',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } 
}));



app.use('/api/data', require('./data'));
app.use('/api/delete', require('./delete'));
app.use('/api/update', require('./update'));



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});