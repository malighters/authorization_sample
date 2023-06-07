const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.router');
const infoRouter = require('./routes/info.router');
const errorHandlerMiddleware = require('./middlewares/errorHander.middleware');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/info', infoRouter);

app.use(errorHandlerMiddleware);

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  app.listen(process.env.PORT, async () => {
    console.log(`Server has been started on http://localhost:${process.env.PORT}`);

    const user = await User.findOne({ email: "admin@admin.com" });

    if(!user) {
      const passwordHash = await bcrypt.hash("password", 10);
      await User.create({ email: "admin@admin.com", password: passwordHash, name: "admin", isAdmin: true });
    }
  })
});