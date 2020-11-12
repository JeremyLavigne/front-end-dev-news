import React, { useState } from 'react';
import './Topics.css'

import topicService from '../service/topics'
import articleService from '../service/articles'

function Topics({topics, setTopics, setArticles}) {

    const [ newName, setNewName ] = useState('');

    const getAllArticles = () => {
        articleService.getAll()
        .then((data) => {
            setArticles(data)})
    }

    const createOne = () => {
        const newTopic = {
            name: newName,
        }
        
        topicService.createOne(newTopic)
        .then(() => {
            setNewName('')
            topicService.getAll()
            .then((data) => {
                setTopics(data)})
        })
    }

    const filterByTopicId = (topicId) => {
        articleService.getAllByTopicId(topicId)
        .then((data) => {
            setArticles(data)
        })
    }

    return (
        <div className="topics-section">
            <div className="create-topics">
                <h4>Create Topic</h4>
                <p> 
                    <input 
                        placeholder="Enter Name"
                        value={newName}
                        onChange={(e) => {setNewName(e.target.value)}} 
                    />
                    <button onClick={createOne}>Create</button>
                </p>
            </div>
            <div className="filter-with-topics">
                <h4>Filter with Topic</h4>
                <button onClick={() => getAllArticles()}>All</button>
                { topics.length === 0 ? "No Topics yet" :
                    topics.map((top) => 
                        <button key={top.id}
                        onClick={() => filterByTopicId(top.id)}
                        >{top.name}</button>) 
                    }
                
            </div>
        </div>
    );
}

export default Topics;
