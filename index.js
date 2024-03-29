const express = require('express');
const app = express();
const port = 3000;
const database = require('./util/Database.js');
const cookieParser = require('cookie-parser');
const questionRoutes = require('./routes/QuestionRoutes');
const authenticationRoutes = require('./routes/AuthenticationRoutes');
const userRoutes = require('./routes/UserRoutes');
const errorHandling = require('./middleware/ErrorHandler');

const bodyParser = require('body-parser');
const cors = require('cors');




app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/question', questionRoutes);
app.use('/auth', authenticationRoutes);
app.use('/user', userRoutes);
app.use(errorHandling);


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



