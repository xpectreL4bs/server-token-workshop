'use strict'

const { jwt }  = require('../lib/jwt');
const secret = '2dadb812-ba98-49d6-8b78-a38edf61cc16';

function isAuthorizedUser (req, response, next) {
  if (!req.headers.authorization) {
    return response.status(403)
      .send({message: 'You shall not pass!!!'})
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verifyToken(token, secret)
    .then(res=>{
      console.log('el token es válido...', res);
      return next();
    })
    .catch( err=>{
      console.log('An error occur: ', err.message);
      return response.status(403)
        .send({message: err.message})
    });

 
}


module.exports = isAuthorizedUser;