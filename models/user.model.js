const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: [true, 'Please provide your email'], 
    validate: [validator. isEmail, 'Please provide a valid email'],
    unique: true
  }, 
  password: {
    type: String, 
    required: [true, 'Please provide your password']
  },
  name: {
    type: String, 
    required: [true, 'Please provide your full name'],
    minLength: 3, 
    maxLength: 20
  }, 
  isAdmin: {
    type: Boolean,
    default: false
  },
  boss: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  subs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
});

userSchema.methods.createJWT = function () {
  return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

userSchema.methods.comparePasswords = async function (receivedPassword) {
  const isMatch = await bcrypt.compare(receivedPassword, this.password);
  return isMatch;
}

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
    delete returnedObject.subs
  }
})


const User = mongoose.model('User', userSchema);

module.exports = User;