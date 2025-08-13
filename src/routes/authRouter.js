const { Router } = require('express');
const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.post('/login', authController.loginPost);

module.exports = authRouter;