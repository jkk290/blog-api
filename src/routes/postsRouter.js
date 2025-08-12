const { Router } = require('express');
const postsController = require('../controllers/postsController');

const postsRouter = Router();

postsRouter.get('/', postsController.getPosts);

postsRouter.post('/', postsController.postPosts);

postsRouter.put('/:postId', postsController.putPosts);

postsRouter.delete('/:postId', postsController.deletePosts);

module.exports = postsRouter;