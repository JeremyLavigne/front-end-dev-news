import React from 'react'
import './Comment.css'

// Components
import Button from './atoms/Button'


function Comment({comment, deleteComment}) {

    return (
        <div className="comment">
            <div className="comment-content">
                <Button content="x" type="del" onClick={() => deleteComment(comment.id)} /> 
                <p>{ comment.body }</p>
                <p className="author">{comment.authorName}</p>
            </div>
        </div>
    );
}

export default Comment;