import React, { useState, useEffect } from 'react'
import commentService from '../service/comments'
import Comment from './Comment'
import './Article.css'

function Article({ article, deleteArticle }) {

    const [comments, setComments] = useState([]);
    // Variables for adding comments
    const [newBody, setNewBody] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    const getAllCommentByArticleId = () => {
        commentService.getAllByArticleId(article.id)
            .then((data) => {
                setComments(data)
            })
    }

    useEffect(() => {
        getAllCommentByArticleId();
    }, [])

    const createComment = () => {
        const newComment = {
            body: newBody,
            authorName: newAuthor,
            article: article
        }
        commentService.createOne(newComment)
            .then(() => {
                setNewAuthor('')
                setNewBody('')
                getAllCommentByArticleId();
            })
    }

    const deleteComment = (commentId) => {
        commentService.deleteComment(commentId)
        .then(() => {
            getAllCommentByArticleId();
        });
    }

    const handleAddTopic = () => {
        console.log("send a put request with article linked to topic")
    }

    return (
            <div className="article">
                <button className="delete-button" onClick={() => deleteArticle(article.id)}>
                    Del
                </button>

                <div className="topic-header">
                    {article.topics.map((top) => <li key={top.id}>{top.name}</li>)}
                    <div>
                        <label htmlFor="cars">Add Topic</label>
                        <select name="cars" id="cars">
                            <option value="volvo">Add</option>
                            <option value="saab">a Map</option>
                            <option value="opel">With</option>
                            <option value="audi">Topics</option>
                        </select>
                        <button onClick={handleAddTopic}>Add</button>
                    </div>
                </div>

                <h3>{article.title}</h3>

                <div className="article-body">
                    <div>{article.body}</div>
                    <div className="author">{article.authorName}</div>
                </div>

                <div className="comments-bloc">
                    {comments.length === 0 ? "No comments" :
                        comments.map((com) =>
                            <Comment key={com.id} comment={com} deleteComment={deleteComment}/>)
                    }
                </div>
                <div className="add-comment">
                    <input
                        className="body-comment-input"
                        placeholder="Add A comment"
                        value={newBody}
                        onChange={(e) => { setNewBody(e.target.value) }}
                    /><br />
                    <input
                        placeholder="Your name"
                        value={newAuthor}
                        onChange={(e) => { setNewAuthor(e.target.value) }}
                    />
                    <button onClick={createComment}>Create</button>
                </div>
            </div>
    );
}

export default Article;