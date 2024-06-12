const jwt = require('jsonwebtoken')

module.exports = {
    userAuth: async (req, res, next) => {
        try {
            const accessToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ''
            const result = await jwt.verify(accessToken, 'hienhan0901')
            if (!result) {
                throw ({ message: "token invalid" })
            }
            next()
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}