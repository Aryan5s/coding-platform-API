const express = require('express');
const routes = express.Router();
const {
    displayQuestions,
    displayUploadedQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionControllers');
const { authenticateToken } = require('../middlewares');


routes.get('displayQuestions' , authenticateToken,  displayQuestions);
routes.get('/displayUploadedQuestions' , authenticateToken , displayUploadedQuestions);
routes.post('/addQuestion' ,authenticateToken , addQuestion);
routes.post('/updateQuestion' ,authenticateToken , updateQuestion);
routes.post('/deleteQuestion' ,authenticateToken , deleteQuestion);

module.exports = routes;
