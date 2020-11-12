import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Article from './components/Article'
import NewArticle from './components/NewArticle';
import Topics from './components/Topics'

// Services
import articleService from './service/articles'
import topicService from './service/topics'


function App() {

    const [articles, setArticles] = useState([]);
    const [ topics, setTopics ] = useState([]);

    useEffect(() => {
        const getAll = () => {
            articleService.getAll()
                .then((data) => {
                    setArticles(data)})
        }
        const getAllTopics = () => {
            topicService.getAll()
            .then((data) => {
                setTopics(data)})
        }

        getAll();
        getAllTopics();
    }, [])

    const deleteArticle = (articleId) => {
        articleService.deleteArticle(articleId)
        .then(() => {
            articleService.getAll()
            .then((data) => {
                setArticles(data)})
        });
    }

    return (
        <div>
            <header>
                <h1 className="main-title">Dev News</h1>
                <div className="main-header">
                    <NewArticle setArticles={setArticles}/>
                    <Topics topics={topics} setTopics={setTopics} setArticles={setArticles}/>
                </div>
            </header>
            <div className="App">
                {articles.length === 0 ? "No articles" :
                    articles
                        .sort((a, b) => a.id > b.id ? -1 : 1)
                        .map((art) =>
                            <Article key={art.id} 
                                article={art} deleteArticle={deleteArticle}
                                topics={topics} setArticles={setArticles}
                            />)
                }
            </div>
        </div>
    );
}

export default App;
