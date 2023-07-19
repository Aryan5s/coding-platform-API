const express = require('express');
const routes = express.Router();
const {
    submitCode,
    listAllSubmissions,
    listUserSubmissions,
    listQuestionSubmissions,
    listSelfSubmissions
} = require('../controllers/submissionControllers');
const {authenticateToken} = require('../middlewares/index')

// submit code
routes.post('/submission', authenticateToken, submitCode)
// list submissions
routes.get('/listAllSubmissions', authenticateToken, listAllSubmissions)
routes.post('/listUserSubmissions', authenticateToken, listUserSubmissions)
routes.post('/listQuestionSubmissions', authenticateToken, listQuestionSubmissions)
routes.get('/listSelfSubmissions', authenticateToken, listSelfSubmissions)

module.exports = routes;