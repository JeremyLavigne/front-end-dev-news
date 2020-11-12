import React, { useState } from 'react';
import './Topics.css'

import topicService from '../service/topics'

function Topics() {

    const [ topics, setTopics ] = useState([]);
    const [ newName, setNewName ] = useState('');

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
                { topics.length === 0 ? "No Topics" :
                    topics.map((top) => 
                        <li key={top.id}>{top.name}</li>) 
                    }
                
            </div>
        </div>
    );
}

export default Topics;
