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
  }
});

userSchema.pre('save', async function () {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
})

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
  }
})


const User = mongoose.model('User', userSchema);

export default User;