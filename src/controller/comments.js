import commentService from '../service/comments'

const getAllCommentByArticleId = (articleId, setComments) => {
    commentService.getAllByArticleId(articleId)
        .then((data) => {
            setComments(data)
        }
    )
}

const createComment = (newComment, articleId, setComments) => {
    commentService.createOne(newComment)
        .then(() => {
            getAllCommentByArticleId(articleId, setComments);
        }
    )
}

const deleteComment = (commentId, articleId, setComments) => {
    commentService.deleteComment(commentId)
    .then(() => {
        getAllCommentByArticleId(articleId, setComments);
    });
}

export default { 
    getAllCommentByArticleId,
    createComment,
    deleteComment
}