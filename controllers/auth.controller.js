const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const badRequestError = require('../errors/badRequestError.error');

const register = async (req, res, next) => {
  const { email, password, name, bossId } = req.body;
  if(!name || !email || !password) {
    throw new badRequestError('Please fill all fields');
  } 

  const userExists = await User.findOne({ email });
  if(userExists) {
    throw new badRequestError('Email already in use');
  }

  const boss = await User.findById(bossId);
  if(!boss) {
    throw new badRequestError('Boss does not exist in system'); 
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: passwordHash, name, boss });

  boss.subs.push(user);
  await boss.save();

  const token = await user.createJWT();
  res.status(201).json({ token });
}

const auth = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new badRequestError('Provide all credentials');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new badRequestError('This user does not exist');
  }

  const isPasswordMatch = await user.comparePasswords(password);
  if (!isPasswordMatch){
    throw new badRequestError('Invalid password');
  }
  else{ 
    const token = await user.createJWT();
    res.status(200).json({ token });
  }
}

module.exports = { register, auth }