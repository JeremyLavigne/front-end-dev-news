import React, { useState } from 'react';
import './Topics.css'

// Components
import Button from './atoms/Button'

// Services
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
                    <Button content="Create" type="create" onClick={createOne} /> 
                </p>
            </div>
            <div className="filter-with-topics">
                <h4>Filter with Topic</h4>
                <Button content="All" type="topic-filter" onClick={getAllArticles} /> 

                { topics.length === 0 ? "No Topics yet" :
                    topics.map((top) =>
                        <Button 
                            key={top.id} 
                            content={top.name} 
                            type="topic-filter" 
                            onClick={() => filterByTopicId(top.id)}
                        /> 
                    )
                }
            </div>
        </div>
    );
}

export default Topics;
