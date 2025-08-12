const prisma = require('./prisma');

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

module.exports = {
    getPosts,
    postPosts,
    putPosts,
    deletePosts
};