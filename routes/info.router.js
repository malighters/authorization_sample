const express = require('express');
const { getRegulars, changeBoss } = require('../controllers/info.controller');
const authMiddleware = require('../middlewares/auth.middleware')

const infoRouter = express.Router();

infoRouter.get('/', authMiddleware, getRegulars);

infoRouter.put('/changeBoss', authMiddleware, changeBoss)

module.exports = infoRouter;