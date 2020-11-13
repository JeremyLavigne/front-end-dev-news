import React, { useState, useEffect } from 'react'
import './Article.css'

// Components
import Button from './atoms/Button'
import Comment from './Comment'

// Controllers
import articleController from '../controller/articles'
import commentController from '../controller/comments'


function Article({ article, deleteArticle, setArticles, topics }) {

    const [comments, setComments] = useState([]);
    // Variables for adding comments
    const [newBody, setNewBody] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    useEffect(() => {
        commentController.getAllCommentByArticleId(article.id, setComments);
    }, [])

    const createComment = () => {
        const newComment = {
            body: newBody,
            authorName: newAuthor,
            article: article
        }
        commentController.createComment(newComment, article.id, setComments)
        setNewAuthor('')
        setNewBody('')
    }

    const deleteComment = (commentId) => {
        commentController.deleteComment(commentId, article.id, setComments)
    }

    const handleAddTopic = (e) => {
        const newTopic = document.getElementById(`select-topic-article-${article.id}`).value;

        const updatedArticle = {...article}
        updatedArticle.topics = article.topics.concat({
            id: newTopic.substr(0,1),
            name: newTopic. substr(1)
        })

        articleController.updateArticle(updatedArticle, setArticles)
    }

    return (
            <div className="article">
                <Button 
                    content="x" type="del" 
                    onClick={() => deleteArticle(article.id)} 
                />

                <div className="topic-header">
                    { article.topics
                        .map((top) => 
                            <li key={top.id}>{top.name}</li>
                        )
                    }
                    <div>
                        <select id={`select-topic-article-${article.id}`}>
                            <option vlaue={null}>Add topic</option>
                            { topics
                                .map((top) => 
                                    <option key={top.id} value={`${top.id}${top.name}`}>
                                        {top.name}
                                    </option>
                                ) 
                            }
                        </select>
                        <Button
                            content="Add" type="create" 
                            onClick={handleAddTopic} 
                        /> 
                    </div>
                </div>

                <h3>{article.title}</h3>

                <div className="article-body">
                    <div>{article.body}</div>
                    <div className="author">{article.authorName}</div>
                </div>

                <div className="comments-bloc">
                    {comments.length === 0 ? "" :
                        comments.map((com) =>
                            <Comment 
                                key={com.id} comment={com} 
                                deleteComment={deleteComment}
                            />
                        )
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
                    <Button 
                        content="Create" type="create" 
                        onClick={createComment} 
                    /> 
                </div>
            </div>
    );
}

export default Article;
