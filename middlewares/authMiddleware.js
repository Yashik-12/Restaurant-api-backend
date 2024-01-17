const JWT = require('jsonwebtoken')
const { __ } = require("i18n");

module.exports = async (req, res, next) => {
    try {
        // Get Token
        const token = req.headers['authorization'].split(' ')[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: __("unAuthorizedUser")
                })
            } else {
                req.body.id = decode.id
                next()
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: __("provideAuthToken"),
            error
        })
    }
}