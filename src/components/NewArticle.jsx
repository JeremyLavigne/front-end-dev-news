import React, { useState } from 'react';
import './NewArticle.css';
import articleService from '../service/articles'

function NewArticle({setArticles}) { 

    const [ newTitle, setNewTitle ] = useState('');
    const [ newBody, setNewBody ] = useState('');
    const [ newAuthor, setNewAuthor ] = useState('');

    const createOne = () => {
        const newArticle = {
            title: newTitle,
            body: newBody,
            authorName: newAuthor
        }
        articleService.createOne(newArticle)
        .then((data) => {
            console.log(data, 'created')
            setNewAuthor('')
            setNewBody('')
            setNewTitle('')
            articleService.getAll()
            .then((data) => {
                setArticles(data)})
        })
    }

    return (

        <div className="create-article">
            <h4>Create article</h4>
            <input
                placeholder="Enter Title"
                value={newTitle}
                onChange={(e) => { setNewTitle(e.target.value) }}
            /><br />
            <input
                className="body-input"
                placeholder="Enter Body"
                value={newBody}
                onChange={(e) => { setNewBody(e.target.value) }}
            /><br />
            <input
                placeholder="Enter Author name"
                value={newAuthor}
                onChange={(e) => { setNewAuthor(e.target.value) }}
            />
            <button onClick={createOne}>Create</button>
        </div >
    );
}

export default NewArticle;
