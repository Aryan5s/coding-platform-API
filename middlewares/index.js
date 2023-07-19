const jwt = require('jsonwebtoken');
let  refreshTokens = []
// generate access token
function generateAccessToken(user) {
    return jwt.sign(
        {
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '10m' }
    )
}

// generate refresh token
function generateRefreshToken(user) {
    const refreshToken = jwt.sign(
        {
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_REFRESH_TOKEN
    )
    refreshTokens.push(refreshToken)
    return refreshToken
}

// middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(401).send('Token is invalid')
    } else {
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).send('Token is invalid')
            } else {
                req.user = user
                next()
            }
        })
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    authenticateToken
}
