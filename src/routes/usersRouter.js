const { Router } = require('express');
const { requireAuth } = require('../auth/requireAuth');
const usersController = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.get('/:userId', requireAuth, usersController.getUserById);
usersRouter.put('/:userId', requireAuth, usersController.putUsers);
usersRouter.delete('/:userId', requireAuth, usersController.deleteUsers);

usersRouter.get('/', requireAuth, usersController.getUsers);
usersRouter.post('/', usersController.postUsers);

module.exports = usersRouter;