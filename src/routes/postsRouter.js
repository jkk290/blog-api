const { Router } = require('express');

const postsRouter = Router();

postsRouter.get('/', (req, res) => res.json({
    message: 'GET method on posts'
}));

postsRouter.post('/', (req, res) => res.json({
    message: 'POST method on posts'
}));

postsRouter.put('/:postId', (req, res) => res.json({
    message: `PUT method on post id ${req.params.postId}`
}));

postsRouter.delete('/:postId', (req, res) => res.json({
    message: `DELETE method on post id ${req.params.postId}`
}));

module.exports = postsRouter;