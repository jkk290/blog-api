const db = require('../../storages/queries');

exports.getPublishedPosts = async (req, res) => {
    try {
        const posts = await db.getPublishedPosts();
        res.json(posts);        
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'Failed to retrieve posts'
            }
        });
    };    
};

exports.getUnpublishedPosts = async (req, res) => {
    try {
        const posts = await db.getUnpublishedPosts();

        if (posts === null) {
            res.status(404).json({
                error: {
                    message: 'No unpublished posts found'
                }
            });
        };
        
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'Failed to retrieve posts'
            }
        });
    };
};

exports.getPost = async (req, res) => {
    try {
        const post = await db.getPostById(parseInt(req.params.postId));
        if (!post) {
            return res.status(404).json({
                error: {
                    message: `No post found with ID ${req.params.postId}`
                }
            });
        }
        res.json(post)
    } catch (error) {
        res.status(500).json({
            error: {
                message: 'Failed to retrieve post'
            }
        });
    }
}

exports.postPosts = async (req, res) => {
    const userId = 1;

    try {
        if ((req.body.postTitle === undefined) || (req.body.postTitle === '')) {
            return res.status(400).json({
                error: {
                    message: 'Title is required'
                }
            });
        };

        const post = {
            title: req.body.postTitle,
            text: req.body.postText,
            authorId: userId
        };

        if (req.body.isPublished === 'true') {
            post.isPublished = true;
        };

        const newPost = await db.postPosts(post);
        res.status(201).json(newPost);

    } catch (error) {
        res.status(500).json({
            error: {
                message: 'Failed to create post'
            }
        });
    }; 
};

exports.putPosts = async (req, res) => {
    try {
        if ((req.body.postTitle === undefined) || (req.body.postTitle === '')) {
            return res.status(400).json({
                error: {
                    message: 'Title is required'
                }
            });
        };

        const post = {
            id: parseInt(req.params.postId),
            title: req.body.postTitle,
            text: req.body.postText
        };

        if (req.body.isPublished === 'true') {
            post.isPublished = true;
        };

        const updatedPost = await db.putPosts(post);
        res.status(200).json(updatedPost);

    } catch (error) {
        if ((error.name === 'PrismaClientKnownRequestError') && (error.message.includes('No record was found'))) {
            return res.status(404).json({
                error: {
                    message: `No post found with ID ${req.params.postId}`
                }
            });
        };

        res.status(500).json({
            error: {
                message: 'Failed to update post'
            }
        });
    };    
};

exports.deletePosts = async (req, res) => {
    try {
        await db.deletePosts(parseInt(req.params.postId));
        res.sendStatus(204);

    } catch (error) {
        if ((error.name === 'PrismaClientKnownRequestError') && (error.message.includes('No record was found'))) {
            return res.status(404).json({
                error: {
                    message: `No post found with ID ${req.params.postId}`
                }
            });
        };

        res.status(500).json({
            error: {
                message: 'Failed to delete post'
            }
        });
    };
};