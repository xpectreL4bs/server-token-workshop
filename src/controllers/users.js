'use strict'

const User = require('../models/user');
const { jwt } = require('../lib/jwt');
const secret = '2dadb812-ba98-49d6-8b78-a38edf61cc16';


const tokenEncryptOptions = {
  algorithm: 'HS256',
  expiresIn: 30
}

const tokenEncryptOptionsForRefreshToken = {
  algorithm: 'HS256',
  expiresIn: 60*60
}

function createUser (req, response) {
  
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    image: req.body.image,
  });

  user.save((err, res)=>{
    if (err) return response.status(500).send({message: `Error trying to create the user: ${err}`})
    res.password = undefined;
    return response.status(201).send({data: res });
  })
}

function login( req, response) {
  
  let { email, password} = req.body;

  User.findOne({email}, (err, data)=>{
    if (err) return response.status(500).send({ message: `Error: ${err}` })
    if (!data) return response.status(404).send({ message:`User with email ${email} not found` })
    if (data) {
      console.log('data: ', data);
      const payload= {
        id: data.id,
        email: data.email,
        name: data.name
      };

      jwt.signPayload(payload, secret, tokenEncryptOptions)
        .then( token => {

          jwt.signPayload(payload, secret, tokenEncryptOptionsForRefreshToken)
            .then(refreshToken=>{
              return response
              .status(200)
              .send({data:{
                token: token,
                refreshToken: refreshToken
              }})
            })
            .catch(err=>response.status(500).send({message: err}))

        })

    } 
  });


}

function getProfile(req, response) {

  const userData = {name: "Gus Fring", email: 'hola@polloshermanos.com'};
  return response.status(200).send({user:userData});

}

function refreshToken(req,response) {
  let token = req.headers.authorization.split(' ')[1];

  jwt.verifyToken(token, secret)
    .then( data => {
      let {email} = data;
      User.findOne({ email }, (err, data)=>{
        if (err) return response.status(500).send({ message: `Error: ${err}` })
        if (!data) return response.status(404).send({ message:`User with email ${email} not found` })
        if (data) {
          console.log('data: ', data);
          const payload= {
            id: data.id,
            email: data.email,
            name: data.name
          };
    
          jwt.signPayload(payload, secret, tokenEncryptOptions)
            .then( token => {
    
              jwt.signPayload(payload, secret, tokenEncryptOptionsForRefreshToken)
                .then(refreshToken=>{
                  return response
                  .status(200)
                  .send({data:{
                    token: token,
                    refreshToken: refreshToken
                  }})
                })
                .catch(err=>response.status(500).send({message: err}))
    
            })
    
        } 
      });
    })
    .catch( err=>{
      console.log('An error occur: ', err.message);
      return response.status(403)
        .send({message: err.message})
    });


}


module.exports =  {
  createUser,
  login,
  getProfile,
  refreshToken
};