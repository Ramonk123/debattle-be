
const {MongoClient} = require('mongodb');
const database = require('./util/database.js');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

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



