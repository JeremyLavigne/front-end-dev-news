import axios from 'axios'

const baseUrl = 'http://localhost:8080/comments'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const getAllByArticleId = async (id) => {
    const request = axios.get(`${baseUrl}/?articleId=${id}`)
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

const deleteComment = async  (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request
        return response.data
}
  
export default { getAll, getAllByArticleId, createOne, update, deleteComment }