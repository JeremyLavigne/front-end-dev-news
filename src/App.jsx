import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Article from './components/Article'
import NewArticle from './components/NewArticle';
import Topics from './components/Topics'

// Controllers
import articleController from './controller/articles'
import topicController from './controller/topics'


function App() {

    const [articles, setArticles] = useState([]);
    const [ topics, setTopics ] = useState([]);

    useEffect(() => {
        articleController.getAllArticles(setArticles);
        topicController.getAllTopics(setTopics);
    }, [])

    const deleteArticle = (articleId) => {
        articleController.deleteArticle(articleId, setArticles)
    } 

    return (
        <div>
            <header>
                <h1 className="main-title">Dev News</h1>

                <div className="main-header">
                    <NewArticle setArticles={setArticles}/>
                    <Topics 
                        topics={topics} 
                        setTopics={setTopics} 
                        setArticles={setArticles}
                    />
                </div>
            </header>

            <div className="App">

                { articles.length === 0 
                    ? "No articles" 
                    : articles
                        .sort((a, b) => a.id > b.id ? -1 : 1)
                        .map((art) =>
                            <Article key={art.id} 
                                article={art}
                                topics={topics} 
                                deleteArticle={deleteArticle}
                                setArticles={setArticles}
                            />
                        )
                }
            </div>
        </div>
    );
}

export default App;
