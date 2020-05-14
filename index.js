'use strict';

const express = require('express');

const app = express();

app.get('/', function(req, response){
  response.send('Hello World');
})

app.listen(3000);