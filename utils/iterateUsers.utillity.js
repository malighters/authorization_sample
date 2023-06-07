const iterateThroughUsers = async (array, subs) => {
  array.push(...subs);
  for(let i = 0; i < subs.length; i++) {
    const sub = await User.findById(subs[i]).populate('subs');
    if(sub.subs && sub.subs.length) {
      await iterateThroughUsers(array, sub.subs);
    }
  }
}

module.exports = iterateThroughUsers;