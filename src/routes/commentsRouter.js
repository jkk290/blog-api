const { Router } = require('express');

const commentsRouter = Router();

commentsRouter.get('/', (req, res) => res.json({
    message: 'GET method on comments'
}));

commentsRouter.post('/', (req, res) => res.json({
    message: 'POST method on comments'
}));

commentsRouter.delete('/:commentId', (req, res) => res.json({
    message: `DELETE method on comment ID ${req.params.commentId}`
}));

commentsRouter.put('/:commentId', (req, res) => res.json({
    message: `PUT method on comment ID ${req.params.commentId}`
}));

module.exports = commentsRouter;