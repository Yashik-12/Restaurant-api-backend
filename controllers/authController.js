const userModel = require('../models/userModel');
const { __ } = require("i18n");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


const registerController = async (req, res) => {
    try {
        const { userName, email, password, address, phone, answer } = req.body

        // Validation
        if (!userName || !email || !password || !address || !phone || !answer) {
            return res.status(500).json({
                success: false,
                message: __("provideAllFields")
            })
        }

        // Check User
        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(500).json({
                success: false,
                message: __("emailAlreadyRegistered")
            })
        }

        // Hashing password

        let salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer
        })

        res.status(201).json({
            success: true,
            message: __("successfullyRegistered"),
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: __("errorRegisterApi"),
            error
        })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(500).json({
                success: false,
                message: __("provideEmailPassword")
            })
        }

        // Check User
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: __("userNotFound")
            })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: __("invalidCredentials")
            })
        }

        // Token

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        user.password = undefined

        res.status(200).json({
            success: true,
            message: __("loginSuccess"),
            token,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: __("errorLoginApi"),
            error
        })
    }

}

module.exports = {
    registerController,
    loginController
}