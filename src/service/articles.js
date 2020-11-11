import axios from 'axios'

const baseUrl = 'http://localhost:8080/articles'

const getAll = async () => {
    const request = axios.get(baseUrl) 
    const response = await request
    return response.data
}

const getOneById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    const response = await request
    return response.data
}

const getAllByTopicId = async (id) => {
    const request = axios.get(`${baseUrl}/?topicId=${id}`)
    const response = await request
    return response.data
}

const createOne = async (newObject) => {
    const request = axios.post(baseUrl, newObject);
    const response = await request;
        return response.data;
}

const update = async  (newObject) => {
    const request = axios.put(baseUrl, newObject)
    const response = await request
        return response.data
}

const deleteArticle = async  (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request
        return response.data
}
  
export default { getAll, getOneById, createOne, update, deleteArticle, getAllByTopicId }