import React, { useState, useEffect } from 'react'
import './Article.css'

// Components
import Button from './atoms/Button'
import Comment from './Comment'

// Services
import commentService from '../service/comments'
import articleService from '../service/articles'


function Article({ article, deleteArticle, setArticles, topics }) {

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

    const handleAddTopic = (e) => {
        e.preventDefault()
        const newTopic = document.getElementById(`select-topic-article-${article.id}`).value;
        const newTopicId = newTopic.substr(0,1);
        const newTopicName = newTopic. substr(1);
        const updatedArticle = {
            id: article.id,
            title: article.title,
            body: article.body,
            authorName: article.authorName,
            topics: article.topics.concat({id: newTopicId, name: newTopicName})
        }
        console.log(updatedArticle)
        articleService.update(updatedArticle)
        .then((data) => {
            articleService.getAll()
                .then((data) => {
                    setArticles(data)})
        });
    }

    return (
            <div className="article">
                <Button content="x" type="del" onClick={() => deleteArticle(article.id)} />

                <div className="topic-header">
                    {article.topics.map((top) => <li key={top.id}>{top.name}</li>)}
                    <div>
                        <form>
                        <select id={`select-topic-article-${article.id}`}>
                            <option vlaue={null}>Add topic</option>
                        { topics
                            .map((top) => 
                            <option key={top.id} value={`${top.id}${top.name}`}>{top.name}</option>) 
                        }
                        </select>
                        <Button content="Add" type="create" onClick={handleAddTopic} /> 
                        </form>
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
                    <Button content="Create" type="create" onClick={createComment} /> 
                </div>
            </div>
    );
}

export default Article;