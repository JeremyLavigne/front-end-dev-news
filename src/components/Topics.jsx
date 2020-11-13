import React, { useState } from 'react';
import './Topics.css'

// Components
import Button from './atoms/Button'

// Controllers
import articleController from '../controller/articles'
import topicController from '../controller/topics'


const Topics = ({topics, setTopics, setArticles}) => {

    const [ newName, setNewName ] = useState('');

    const createTopic = () => {
        const newTopic = { name: newName }
        topicController.createTopic(newTopic, setTopics)
        setNewName('')
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
                    <Button 
                        content="Create" type="create" 
                        onClick={createTopic} 
                    /> 
                </p>
            </div>
            <div className="filter-with-topics">
                <h4>Filter with Topic</h4>
                <Button 
                    content="All" type="topic-filter" 
                    onClick={() => articleController.getAllArticles(setArticles)} 
                /> 

                { topics.length === 0 ? "No Topics yet" :
                    topics.map((top) =>
                        <Button 
                            key={top.id} 
                            content={top.name} 
                            type="topic-filter" 
                            onClick={() => articleController.getAllArticlesByTopicId(top.id, setArticles)}
                        /> 
                    )
                }
            </div>
        </div>
    );
}

export default Topics;
