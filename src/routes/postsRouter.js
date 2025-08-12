const { Router } = require('express');
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');

const postsRouter = Router();

postsRouter.delete('/:postId/comments/:commentId', commentsController.deleteComments);

postsRouter.put('/:postId/comments/:commentId', commentsController.putComments);

postsRouter.get('/:postId/comments', commentsController.getComments);

postsRouter.post('/:postId/comments', commentsController.postComments);

postsRouter.put('/:postId', postsController.putPosts);
postsRouter.delete('/:postId', postsController.deletePosts);
postsRouter.get('/', postsController.getPosts);
postsRouter.post('/', postsController.postPosts);

module.exports = postsRouter;