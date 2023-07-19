const Question = require('./models/Question');
const axios = require('axios');
require('dotenv').config();
const SPHERE_PROBLEMS_URL = process.env.SPHERE_PROBLEMS_URL;
const SPHERE_PROBLEMS_TOKEN = process.env.SPHERE_PROBLEMS_TOKEN;

// display all Questions
const displayQuestions = async (req, res) => {
    // is user admin
    if (req.user.role == 'admin') {
        // get directly from sphere api
        await axios.get(SPHERE_PROBLEMS_URL + '?access_token=' + SPHERE_PROBLEMS_TOKEN).then(response => {
            res.send(response.data)
        }).catch(err => {
            res.status(400).send(err)
        })
    } else {
        res.send('You are not authorized')
    }
}

// Display Questions Uploaded by admin
const displayUploadedQuestions = async (req, res) => {
    if (req.user.role == 'admin') {
        // get question ids from mongoDB and send them to sphere api
        let questionsList = []
        await Question.find().then(async (questions) => {
            for (let i = 0; i < questions.length; i++) {
                await axios.get(SPHERE_PROBLEMS_URL + '/' + questions[i].id + '?access_token=' + SPHERE_PROBLEMS_TOKEN).then(response => {
                    questionsList.push(response.data)
                }).catch(err => {
                    res.send(err)
                })
            }
        })
        if (questionsList.length > 0) res.send(questionsList)
        else res.send('No questions uploaded')
    } else {
        res.send('You are not authorized')
    }
}

// Add a new Question
const addQuestion = async (req, res) => {
    if (req.user.role == 'admin') {
        // validate if question is valid
        if (req.body.name == null || req.body.description == null) {
            return res.status(400).send('Missing required fields')
        } else {
            await axios.post(SPHERE_PROBLEMS_URL + '?access_token=' + SPHERE_PROBLEMS_TOKEN, {
                "name": req.body.name,
                "body": req.body.description,
                "masterjudgeId": 1001
            }).then(async (response) => {
                await Question.create({
                    id: response.data.id
                })
                return res.send(response.data)
            }).catch(err => {
                res.status(400).send(err)
            })
        }
    } else {
        res.send('You are not authorized')
    }
}

// Update a question
const updateQuestion = async (req, res) => {
    if (req.user.role == 'admin') {
        // get previous question data from sphere api
        await axios.get(SPHERE_PROBLEMS_URL + '/' + req.body.id + '?access_token=' + SPHERE_PROBLEMS_TOKEN).then(response => {
            // if required fields are empty overwrite with previous data
            if (req.body.name == null) {
                req.body.name = response.data.name
            }
            if (req.body.name == null) {
                req.body.description = response.data.body
            }
        })
        await axios.put(SPHERE_PROBLEMS_URL + '/' + req.body.id + '?access_token=' + SPHERE_PROBLEMS_TOKEN, {
            "name": req.body.name,
            "body": req.body.description
        }).then(response => {
            return res.send(response.data)
        }).catch(err => {
            res.status(400).send(err)
        })
    } else {
        res.send('You are not authorized')
    }
}

// Delete a Question
const deleteQuestion =async (req, res) => {
    if (req.user.role == 'admin') {
        await axios.get(SPHERE_PROBLEMS_URL + '/' + req.body.id + '/' + 'testcases?access_token=' + SPHERE_PROBLEMS_TOKEN).then(response => {
            res.send(response.data)
        }).catch(err => {
            res.status(400).send(err)
        })
    } else {
        res.send('You are not authorized')
    }
}

module.exports = {
    displayQuestions,
    displayUploadedQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion
}