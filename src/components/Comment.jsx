import React from 'react'
import './Comment.css'

function Comment({comment, deleteComment}) {

    return (
        <div className="comment">
            <div className="comment-content">
                <button className="delete-button" onClick={() => deleteComment(comment.id)}>
                    Del
                </button>
                <p>{ comment.body }</p>
                <p className="author">{comment.authorName}</p>
            </div>
        </div>
    );
}

export default Comment;