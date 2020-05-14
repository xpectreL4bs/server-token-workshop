const jwt = require('jsonwebtoken');


module.exports.jwt = {
  signPayload: function (payload, secret, options={algorithm:'HS256'}) {
    return new Promise( function (resolve, reject) {
      jwt.sign(payload, secret, options, function (err, data){
        if (err) reject(err);
        resolve(data);
      })
    });
  },
  decryptToken: function (token, secret) {
    return new Promise(function(resolve, reject) {
      try {
        resolve({data: jwt.decode(token, secret)})
      } catch (err) {
        console.log('an error occur: ', err.message)
      }
    })
    
  },
  verifyToken: function ( token, secret) {
    return new Promise(function(resolve, reject){
      jwt.verify(token, secret, function(err, data){
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
    
  }
};
