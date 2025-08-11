const { Router } = require('express');

const usersRouter = Router();

usersRouter.get('/', (req, res) => res.json({
    message: 'GET method on users'
}));

usersRouter.post('/', (req, res) => res.json({
    message: 'POST method on users'
}));

usersRouter.put('/:userId', (req, res) => res.json({
    message: `PUT method on user ID ${req.params.userId}`
}));

usersRouter.delete('/:userId', (req, res) => res.json({
    message: `DELETE method on user ID ${req.params.userId}`
}));

module.exports = usersRouter;