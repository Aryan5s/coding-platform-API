require('dotenv').config();
const SPHERE_PROBLEMS_URL = process.env.SPHERE_PROBLEMS_URL
const SPHERE_PROBLEMS_TOKEN = process.env.SPHERE_PROBLEMS_TOKEN

const listTestCase = async (req, res) => {
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

const addTestCase = async (req, res) => {
    if (req.user.role == 'admin') {
        await axios.post(SPHERE_PROBLEMS_URL + '/' + req.body.id + '/' + 'testcases?access_token=' + SPHERE_PROBLEMS_TOKEN, {
            "input": req.body.input,
            "output": req.body.output,
            "judgeId": 1
        }).then(response => {
            res.send(response.data)
        }).catch(err => {
            res.status(400).send(err)
        })
    } else {
        res.send('You are not authorized')
    }
}

const updateTestCase = async (req, res) => {
    if (req.user.role == 'admin') {
        await axios.put(SPHERE_PROBLEMS_URL + '/' + req.body.id + '/' + 'testcases/' + req.body.number + '?access_token=' + SPHERE_PROBLEMS_TOKEN, {
            "input": req.body.input,
            "output": req.body.output
        }).then(response => {
            res.send(response.data)
        }).catch(err => {
            res.status(400).send(err)
        })
    } else {
        res.send('You are not authorized')
    }
}

module.exports = {
    listTestCase,
    addTestCase,
    updateTestCase,
}