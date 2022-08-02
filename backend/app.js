const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port =  process.env.PORT || 5000;
const mongodb = process.env.MONGODB_URL;

app.use(bodyParser.json());

mongoose.connect(mongodb)
.then(() => {
    app.listen(port);
    console.log("Connected to Stori database & Server listening on port: ", port);
})
.catch((err)=> {
    console.error(err)
})