import articleService from '../service/articles';

const getAllArticles = (setArticles) => {
    articleService.getAll()
        .then((data) => {
            setArticles(data)
        }
    );
}

const createArticle = (newArticle, setArticles) => {
    articleService.createOne(newArticle)
        .then(() => {
            getAllArticles(setArticles)
        }
    )
}

// Issue here, can not delete an article who has comment(s) Why ?
const deleteArticle = (articleId, setArticles) => {
    articleService.deleteArticle(articleId)
        .then(() => {
            getAllArticles(setArticles)
        }
    );
}

const updateArticle = (updatedArticle, setArticles) => {
    articleService.update(updatedArticle)
        .then(() => {
            getAllArticles(setArticles)
        }
    );
}

const getAllArticlesByTopicId = (topicId, setArticles) => {
    articleService.getAllByTopicId(topicId)
    .then((data) => {
        setArticles(data)
    })
}

export default { 
    getAllArticles,
    deleteArticle,
    updateArticle,
    createArticle,
    getAllArticlesByTopicId
}