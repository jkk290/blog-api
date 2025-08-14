const prisma = require('./prisma');

// queries related to posts
async function getPublishedPosts() {
    return await prisma.post.findMany({
        where: {
            isPublished:  true
        },
        include: {
            postAuthor: {
                select: {
                    username: true
                }
            }
        }
    });
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
        },
        include: {
            commentAuthor: {
                select: {
                    username: true
                }
            }
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

// queries related to users
async function getUsers() {
    const users = await prisma.user.findMany();
    return users;
};

async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    return user;
};

async function getUserById(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    return user;
}

async function postUsers(user) {
    const newUser = await prisma.user.create({
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin
        }
    })
    return newUser;
};

async function putUsers(user) {
    const updateUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data :{
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin
        }
    });
    return updateUser;
};

async function deleteUsers(userId) {
    await prisma.user.delete({
        where: {
            id: userId
        }
    });
};

module.exports = {
    getPublishedPosts,
    postPosts,
    putPosts,
    deletePosts,
    getComments,
    postComments,
    putComments,
    deleteComments,
    getUsers,
    getUserByUsername,
    getUserById,
    postUsers,
    putUsers,
    deleteUsers
};