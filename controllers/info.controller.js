const User = require('../models/user.model');
const iterateThroughUsers = require('../utils/iterateUsers.utillity');

const getRegulars = async (req, res) => {
  const userId = req.app.locals.user.userId;
  const user = await User.findById(userId).populate('subs');
  if(user.isAdmin) {
    const users = await User.find();
    res.json(users);
  }
  else {
    if(user.subs.length){
      let subs = [];
      await iterateThroughUsers(subs, user.subs);
      res.json(subs);
    }
    else {
      res.send(`The user doesn't have subs`);
    }
  }
};

const changeBoss = async (req, res) => {
  const userId = req.app.locals.user.userId;
  const { regularUserId, newBossId } = req.body;

  const user = await User.findById(regularUserId);

  if(user.boss.toString() !== userId) {
    throw new Error(`You are not a boss of user ${regularUserId}`);
  }

  const newBoss = await User.findById(newBossId);

  if(!newBoss) {
    throw new Error(`There is no user with id ${newBossId} so you can't change boss for user ${regularUserId}`);
  }

  await User.findOneAndUpdate({ _id: regularUserId}, { boss: newBoss });

  res.status(200).send('User has been successfully updated');
};

module.exports = { getRegulars, changeBoss};