'use strict';
const mongoose = require('mongoose');
const configDatabase = require('./src/config/database');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();
const api = require('./src/config/routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, response){
  response.send('Hello World');
})

app.use('/api', api)

mongoose.connect(configDatabase.db, (err, res) =>{
  if (err) console.log(`Error trying to connect to database: ${err}`)

  console.log('Connection stablished with Mongodb ✅');


  app.listen(3000, ()=>{
    console.log(`REST API running at localhost:3000`);
  });

})
