import React, { useState, useEffect } from 'react';
import articleService from './service/articles'
import Article from './components/Article'
import './App.css';

function App() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getAll = () => {
            articleService.getAll()
                .then((data) => {
                    setArticles(data)})
        }
        getAll();
    }, [])

    const deleteArticle = (articleId) => {
        articleService.deleteArticle(articleId)
        .then(() => {
            getAll();
        });
    }

    return (
        <div className="App">
            {articles.length === 0 ? "No articles" :
                articles
                    .sort((a, b) => a.id > b.id ? 1 : -1)
                    .map((art) =>
                        <Article key={art.id} article={art} deleteArticle={deleteArticle}/>)
            }
        </div>
    );
}

export default App;
