const express = require('express');
const app = express();
const port = 3000;

const database = require('./util/database.js');

const questionRoutes = require('./routes/QuestionRoutes');

const bodyParser = require('body-parser');





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/question', questionRoutes);


database.connect()
    .then(() => {
      app.listen(port, () => {
        console.log('Server listening on port 3000');
      });
    })
    .catch((err) => {
      console.log('Failed to connect to MongoDB server', err);
      process.exit(1);
    });



