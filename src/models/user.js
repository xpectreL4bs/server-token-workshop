'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
  email: { type: String, unique:true, lowercase:true},
  name: String,
  image: String,
  password: {type: String, select: false},
  createdAt: { type:Date, default: Date.now() }
});

UserSchema.pre('save', function(next){
  let user = this;

  bcrypt.genSalt(10, (err, salt)=>{

    if (err) return next(err);
    
    bcrypt.hash(user.password, salt, null, (err, hash)=>{

      if (err) return next(err);
      
      user.password = hash;
      
      next();
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
