const { Router } = require('express');

const postsRouter = Router();

postsRouter.get('/', (req, res) => res.json({
    message: 'GET all posts'
}));