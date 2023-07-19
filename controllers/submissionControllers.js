require('dotenv').config();
const SPHERE_PROBLEMS_TOKEN = process.env.SPHERE_PROBLEMS_TOKEN
const SPHERE_SUBMISSIONS_URL = process.env.SPHERE_SUBMISSIONS_URL
const Submission = require('../models/Submission')

// Submission takes time to run so check every second for the result
async function saveSubmissionResult(response, req, res) {
    if (response.data.result.status.name == 'compiling...') {
        sleep(1000).then(async () => {
            await axios.get(SPHERE_SUBMISSIONS_URL + '/' + response.data.id + '?access_token=' + SPHERE_PROBLEMS_TOKEN).then(async (response) => {
                await saveSubmissionResult(response, req, res)
            }).catch(err => {
                res.status(400).send(err)
            })
        })
    } else {
        const submission = await Submission.create({
            submissionId: response.data.id,
            problemId: response.data.problem.id,
            userEmail: req.user.email,
            submissionResponse: response.data.result.status.name
        }).then(() => {
            res.send(submission.submissionResponse)
        }).catch(err => {
            res.status(400).send(err)
        })
    }
}


const submitCode = async (req, res) => {
    await axios.post(SPHERE_SUBMISSIONS_URL + '?access_token=' + SPHERE_PROBLEMS_TOKEN, {
        "problemId": req.body.problemId,
        "source": req.body.source,
        "compilerId": req.body.compilerId || 1
    }).then(async (response) => {
        // sent code to sphere then get the result
        await axios.get(SPHERE_SUBMISSIONS_URL + '/' + response.data.id + '?access_token=' + SPHERE_PROBLEMS_TOKEN).then(async (response) => {
            await saveSubmissionResult(response, req, res)
        }).catch(err => {
            res.status(400).send(err)
        })
    }).catch(err => {
        res.status(400).send(err)
    })
}

const listAllSubmissions = async (req, res) => {
    if (req.user.role == 'admin') {
        await Submission.find().then(async (submissions) => {
            res.send(submissions)
        }).catch(err => {
            res.status(400).send(err)
        })
    } else {
        res.send('You are not authorized')
    }
}

const listUserSubmissions = async (req, res) => {
    if (req.user.role == 'admin') {
        await Submission.find({ userEmail: req.body.email }).then(async (submissions) => {
            res.send(submissions)
        }).catch(err => {
            res.status(400).send(err)
        })
    } else {
        res.send('You are not authorized')
    }
}

const listQuestionSubmissions = async (req, res) => {
    if (req.user.role == 'admin') {
        await Submission.find({ problemId: req.body.problemId }).then(async (submissions) => {
            res.send(submissions)
        }).catch(err => {
            res.status(400).send(err)
        })
    } else {
        res.send('You are not authorized')
    }
}

const listSelfSubmissions = async (req, res) => {
    await Submission.find({ userEmail: req.user.email }).then(async (submissions) => {
        res.send(submissions)
    }).catch(err => {
        res.status(400).send(err)
    })
}

module.exports = {
    submitCode,
    listAllSubmissions,
    listUserSubmissions,
    listQuestionSubmissions,
    listSelfSubmissions,
}