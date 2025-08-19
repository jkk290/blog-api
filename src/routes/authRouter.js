const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth } = require('../auth/requireAuth')

const authRouter = Router();

authRouter.get('/verify', requireAuth, authController.verifyGet);
authRouter.get('/checkAdmin', requireAuth, authController.verifyAdmin);
authRouter.post('/login', authController.loginPost);

module.exports = authRouter;