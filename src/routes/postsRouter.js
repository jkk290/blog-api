const { Router } = require('express');
const { requireAuth } = require('../auth/requireAuth');
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');

const postsRouter = Router();

postsRouter.get('/unpublished', requireAuth, postsController.getUnpublishedPosts);
postsRouter.delete('/:postId/comments/:commentId', requireAuth, commentsController.deleteComments);

postsRouter.put('/:postId/comments/:commentId', requireAuth, commentsController.putComments);

postsRouter.get('/:postId/comments', commentsController.getComments);

postsRouter.post('/:postId/comments', requireAuth, commentsController.postComments);
postsRouter.get('/:postId', postsController.getPost);
postsRouter.put('/:postId', requireAuth, postsController.putPosts);
postsRouter.delete('/:postId', requireAuth, postsController.deletePosts);
postsRouter.get('/', postsController.getPublishedPosts);
postsRouter.post('/', requireAuth, postsController.postPosts);

module.exports = postsRouter;