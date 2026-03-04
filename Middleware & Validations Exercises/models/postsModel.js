let posts = [];
let nextPostId = 1;

function createPost(data) {

    const post = {
        id: nextPostId++,
        title: data.title,
        content: data.content,
        tags: data.tags,
    };
    posts.push(post);
    return post;
}

function getAllPosts() {
    return posts;
}

function findPostById(id) {
    return posts.find((p) => p.id === Number(id))
}

module.exports = { createPost, getAllPosts, findPostById };