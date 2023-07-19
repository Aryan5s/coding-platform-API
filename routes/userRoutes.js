const express = require('express');
const routes = express.Router();
const {
signup,
login,
getNewRefreshToken,
logout
} = require('../controllers/userControllers');

routes.post('/signup' , signup);
routes.post('/login' , login);
routes.post('/refresh' , getNewRefreshToken);
routes.post('/logout' , logout);

module.exports = routes;
