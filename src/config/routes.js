'use strict'
const express = require('express');
const userController = require('../controllers/users');
const auth = require('../services/authn');

const api = express.Router();

api.post('/user', userController.createUser);
api.get('/user/profile', auth, userController.getProfile);

//Autorizathion endpoints
api.post('/auth/get-token', userController.login);
api.post('/auth/refresh-token', auth, userController.refreshToken)

module.exports =  api;
