const express = require('express');
const { register, auth } = require('../controllers/auth.controller');

const authRouter = express.Router();

// First endpoint: Register user
authRouter.post('/register', register);

// Second endpoint: Authenticate as a user
authRouter.post('/login', auth);

module.exports = authRouter;