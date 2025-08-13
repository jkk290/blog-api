const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.put('/:userId', usersController.putUsers);

usersRouter.delete('/:userId', usersController.deleteUsers);

usersRouter.get('/', usersController.getUsers);
usersRouter.post('/', usersController.postUsers);



module.exports = usersRouter;