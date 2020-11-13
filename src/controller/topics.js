import topicService from '../service/topics'

const getAllTopics = (setTopics) => {
    topicService.getAll()
        .then((data) => {
            setTopics(data)
        }
    )
}

const createTopic = (newTopic, setTopics) => {
    topicService.createOne(newTopic)
    .then(() => {
        getAllTopics(setTopics)
    })
}

export default { 
    getAllTopics,
    createTopic
}