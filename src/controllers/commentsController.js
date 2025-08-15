const db = require('../../storages/queries');

exports.getComments = async (req, res) => {
    try {
        const comments = await db.getComments(parseInt(req.params.postId));
        res.json(comments);
    } catch (error) {
        res.status(500).json({
            error:{
                message: 'Failed to retrieve comments'
            }
        });
    };
};

exports.postComments = async (req, res) => {
    try {
        if ((req.body.commentText === undefined) || (req.body.commentText === '')) {
            return res.status(400).json({
                error: {
                    message: 'Text cannot be empty'
                }
            });
        };

        const comment = {
            text: req.body.commentText,
            authorId: parseInt(req.body.authorId),
            postId: parseInt(req.params.postId)
        }

        const newComment = await db.postComments(comment);
        res.status(201).json(newComment);

    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(404).json({
                error: {
                    message: `Post ${req.params.postId} does not exist, can't create comment`
                }
            });
        };
        res.status(500).json({
            error: {
                message: 'Failed to create comment'
            }
        })
    };
};

exports.putComments = async (req, res) => {
    try {
        if ((req.body.commentText === undefined) || (req.body.commentText === '')) {
            return res.status(400).json({
                error: {
                    message: 'Text cannot be empty'
                }
            });
        };

        const comment = {
            id: parseInt(req.params.commentId),
            text: req.body.commentText
        };

        const updatedComment = await db.putComments(comment);
        res.status(200).json(updatedComment);

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                error: {
                    message: `No comment was found to update`
                }
            });
        };
        res.status(500).json({
            error: {
                message: 'Failed to update comment'
            }
        });
    };
};

exports.deleteComments = async (req, res) => {
    try {
      await db.deleteComments(parseInt(req.params.commentId));
      res.sendStatus(204);  
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                error: {
                    message: 'No comment was found to delete'
                }
            })
        }
        res.status(500).json({
            error: {
                message: 'Failed to delete comment'
            }
        });
    };
};