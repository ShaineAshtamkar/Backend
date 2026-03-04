let comments = [];
let nextCommentId = 1;

function addComment(postId, data) {
    const comment = {
        id: nextCommentId++,
        postId: Number(postId),
        content: data.content,
        email: data.email,
    };
    comments.push(comment);
    return comment;
}

function getComments(postId) {
    return comments.filter((c) => c.postId === Number(postId))
}


module.exports = { addComment, getComments };