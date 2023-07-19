// Imports
const bodyParser = require('body-parser')
const express = require('express')
const axios = require('axios')
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const testcaseRoutes = require('./routes/testCaseRoutes');
const app = express()
const PORT = process.env.PORT || 3000
const connectDB = require('./config/db');
const {authenticateToken} = require('./middlewares/index');

connectDB();

// Middlewares 
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Axios headers
axios.defaults.headers.post['Content-Type'] = 'application/json'

app.get('/', authenticateToken, (req, res) => {
    // Greeting
    res.send(`Hello ${req.user.name} you are ${req.user.role}`)
})
app.use('/api/v1' ,userRoutes);
app.use('/api/v1' , questionRoutes);
app.use('/api/v1' , testcaseRoutes);
app.use('/api/v1' , submissionRoutes);

// listen on port
app.listen(PORT)
