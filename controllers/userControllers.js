const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {
    generateAccessToken,
    generateRefreshToken
} = require('../middlewares/index')
const bcrypt = require('bcrypt');

let refreshTokens = []

const getNewRefreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken

    // Check if refresh token is valid
    if (refreshToken == null) {
        return res.status(401).send('Token is invalid')
    } else {
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).send('Token is invalid')
        } else {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
                if (err) {
                    return res.status(403).send('Token is invalid')
                } else {
                    // Generate new access token
                    const accessToken = generateAccessToken(user)

                    return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken })
                }
            })

        }
    }
}

const signup = async (req, res) => {
    // User details from POST request
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role

    // Create user object
    const user = new User({
        name,
        email,
        password,
        role
    })

    // Save user to database
    await user.save().then(() => {
        // Generate access token and refresh token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        // Send response
        res.send({ email: user.email, accessToken: accessToken, refreshToken: refreshToken })
    }).catch(err => {
        // Send error response
        res.status(400).send(err)
    })
}

const login = async (req, res) => {
    // User details from POST request
    const email = req.body.email
    const password = req.body.password

    // Find user in database
    const user = await User.findOne({ email: email })

    // Check if user exists
    if (!user) {
        return res.status(401).send('User not found')
    } else {
        // Check if password is correct for user
        const isPasswordValid = await bcrypt.compare(password, user.password)

        // Check if password is valid
        if (!isPasswordValid) {
            return res.status(401).send('Password is invalid')
        } else {
            // Generate access token and refresh token
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)

            // Send response
            res.send({ email: user.email, accessToken: accessToken, refreshToken: refreshToken })
        }
    }
}

const logout = (req, res) => {
    // Get refresh token from request and remove it from array
    refreshTokens = refreshTokens.filter(token => token !== req.body.refreshToken)
    res.send('Logged out')
}

module.exports = {
    signup,
    login,
    getNewRefreshToken,
    logout
}