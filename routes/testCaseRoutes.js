const express = require('express');
const routes = express.Router();
const {
listTestCase,
addTestCase,
updateTestCase,
} = require('../controllers/testCaseController');
const {authenticateToken} = require('../middlewares/index')

routes.post('/listTestCase', authenticateToken, listTestCase);
routes.post('/addTestCase', authenticateToken, addTestCase);
routes.post('/updateTestCase', authenticateToken, updateTestCase);

module.exports = routes;
