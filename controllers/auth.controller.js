const User = require('../models/user.model');

const register = async (req, res, next) => {
  const { email, password, name, bossId } = req.body;
  if(!name || !email || !password) {
    throw new Error('Please fill all fields');
  } 

  const userExists = await User.findOne({ email });
  if(userExists) {
    throw new Error('Email already in use');
  }

  const boss = await User.findById(bossId);
  if(!boss) {
    console.log(boss);
    throw new Error('Boss does not exist in system'); 
  }

  const user  = await User.create({ email, password, name, boss });
  const token = await user.createJWT();
  res.status(201).json({user, token});
}

const auth = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Provide all credentials');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('This user does not exist');
  }

  const isPasswordMatch = await user.comparePasswords(password);
  if (!isPasswordMatch){
    throw new Error('Invalid password');
  }
  else{ 
    const token = await user.createJWT();
    res.status(200).json({ token });
  }
}

module.exports = { register, auth }