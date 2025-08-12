const prisma = require('./prisma');

// queries related to posts
async function getPosts() {
    return await prisma.post.findMany();
};

async function postPosts(post) {
    const data = {
        title: post.title,
        text: post.text,
        postAuthorId: post.authorId
    };

    if (post.hasOwnProperty('isPublished')) {
        data.isPublished = post.isPublished;
    };

    const newPost = await prisma.post.create({ data });
    return newPost;
};

async function putPosts(post) {
    const data = {
        title: post.title,
        text: post.text
    };

    if (post.hasOwnProperty('isPublished')) {
        data.isPublished = post.isPublished;
    };
    
    const updatedPost = await prisma.post.update({
        where: {
            id: post.id,
        }, data
    });
    return updatedPost;
};

async function deletePosts(postId) {
    await prisma.post.delete({
        where: {
            id: postId
        }
    });
};

// queries related to comments
async function getComments(postId) {
    return await prisma.comment.findMany({
        where: {
            postId: postId
        }
    });
};

async function postComments(comment) {
    const newComment = await prisma.comment.create({
        data: {
            text: comment.text,
            commentAuthorId: comment.authorId,
            postId: comment.postId
        }
    });

    return newComment;
};

async function putComments(comment) {
    const updatedComment = await prisma.comment.update({
        where: {
            id: comment.id
        }, 
        data: {
            text: comment.text
        }        
    });
    return updatedComment;
};

async function deleteComments(commentId) {
    await prisma.comment.delete({
        where: {
            id: commentId
        }
    });
};

module.exports = {
    getPosts,
    postPosts,
    putPosts,
    deletePosts,
    getComments,
    postComments,
    putComments,
    deleteComments
};