const {jwt} = require('./src/lib/jwt');
const secret = 'loremp xcv ipsum... epsilon!·12';
const payload = {
  message: 'La fiesta del fin del mundo es el próximo viernes deja la contraseña',
  partyPassword: 'end0FW02D'
};

const tokenEncryptOptions = {
  algorithm: 'HSxxx256',
  expiresIn: 60
}

const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiTGEgZmllc3RhIGRlbCBmaW4gZGVsIG11bmRvIGVzIGVsIHByw7N4aW1vIHZpZXJuZXMgZGVqYSBsYSBjb250cmFzZcOxYSIsInBhcnR5UGFzc3dvcmQiOiJlbmQwRlcwMkQiLCJpYXQiOjE1ODk0MjA5MDAsImV4cCI6MTU4OTQyMDk2MH0.B0X2qcpO9r5QiAdFvHHaFdpIpSBaxKitNnLexQ5QGZg';

jwt.signPayload(payload, secret, tokenEncryptOptions)
  .then(data=> console.log('token is: ', data))
  .catch(err=>console.log(err.message));

jwt.decryptToken(oldToken, secret)
  .then((res)=>console.log('The message decrypted is: ', res))
  .catch(err=>console.log(err));


jwt.verifyToken(oldToken, secret)
  .then( res => console.log(res))
  .catch( err=>console.log('An error occur: ', err.message));

