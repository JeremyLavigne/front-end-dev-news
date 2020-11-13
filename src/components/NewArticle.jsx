import React, { useState } from 'react';
import './NewArticle.css';

// Components
import Button from './atoms/Button'

// Controllers
import articleController from '../controller/articles'


function NewArticle({setArticles}) { 

    const [ newTitle, setNewTitle ] = useState('');
    const [ newBody, setNewBody ] = useState('');
    const [ newAuthor, setNewAuthor ] = useState('');

    const createArticle = () => {
        const newArticle = {
            title: newTitle,
            body: newBody,
            authorName: newAuthor
        }
        articleController.createArticle(newArticle, setArticles)
        setNewAuthor('')
        setNewBody('')
        setNewTitle('')
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
            <Button 
                content="Create" type="create" 
                onClick={createArticle} 
            /> 
        </div >
    );
}

export default NewArticle;
