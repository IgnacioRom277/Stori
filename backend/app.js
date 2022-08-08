const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/user-routes')
const newsletterRouter = require('./routes/newsletter-routes')
const recipientRouter = require('./routes/recipient-routes')
const emailRouter = require('./routes/email-routes')

const app = express();
const port =  process.env.PORT || 5000;
const mongodb = process.env.MONGODB_URL;

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    next();
});

app.use('/api', userRouter);
app.use('/api', newsletterRouter);
app.use('/api', recipientRouter);
app.use('/api', emailRouter);

mongoose.connect(mongodb)
.then(() => {
    app.listen(port);
    console.log("Connected to Stori database & Server listening on port: ", port);
})
.catch((err)=> {
    console.error(err)
})