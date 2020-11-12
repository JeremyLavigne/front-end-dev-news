import React, { useState, useEffect } from 'react';
import articleService from './service/articles'
import './App.css';

// Components
import Article from './components/Article'
import NewArticle from './components/NewArticle';
import Topics from './components/Topics'


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
        <div>
            <header>
                <h1 className="main-title">Dev News</h1>
                <div className="main-header">
                    <NewArticle setArticles={setArticles}/>
                    <Topics />
                </div>
            </header>
            <div className="App">
                {articles.length === 0 ? "No articles" :
                    articles
                        .sort((a, b) => a.id > b.id ? -1 : 1)
                        .map((art) =>
                            <Article key={art.id} 
                                article={art} deleteArticle={deleteArticle}
                            />)
                }
            </div>
        </div>
    );
}

export default App;
