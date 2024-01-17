const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const { __ } = require("i18n");

// GET User Info
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id })
        // Validation
        if (!user) {
            return res.status(404).json({
                success: false,
                message: __("userNotFound")
            })
        }

        // Hide Password
        user.password = undefined

        // Response
        res.status(200).json({
            success: true,
            message: __("userFetchedSuccessfully"),
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: __("errorGetUserApi"),
            error
        })
    }
}

// Update user info

// const updateUserController = async (req, res) => {
//     try {
//         // Find User
//         const user = await userModel.findById({ _id: req.body.id })

//         // Validation
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User Not Found'
//             })
//         }

//         const { userName, address, phone } = req.body
//         if (userName) {
//             user.userName = userName
//         }

//         if (address) {
//             user.address = address
//         }

//         if (phone) {
//             user.phone = phone
//         }

//         // Save User

//         await user.save()

//         res.status(200).json({
//             success: true,
//             message: 'User updated successfully',
//             user
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: 'Error in user update api',
//             error
//         })
//     }
// }

const updateUserController = async (req, res) => {
    try {
        const { id, userName, address, phone } = req.body;

        // Using findByIdAndUpdate
        const user = await userModel.findByIdAndUpdate(id, { userName, address, phone }, { new: true });

        // Validation
        if (!user) {
            return res.status(404).json({
                success: false,
                message: __("userNotFound")
            });
        }

        res.status(200).json({
            success: true,
            message: __("userUpdatedSuccess"),
            user
        });

    } catch (error) {
        console.error('Error in user update api:', error);
        res.status(500).json({
            success: false,
            message: __("errorUserUpdateApi"),
            error// Send only the error message
        });
    }
};

// Update User Password

const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.body.id })

        // Validation
        if (!user) {
            return res.status(404).json({
                success: false,
                message: __("userNotFound")
            })
        }

        // Get data from user

        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(500).json({
                success: false,
                message: __("provideOldandNewPassword")
            })
        }

        // Compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(500).json({
                success: false,
                message: __("invalidOldPassword")
            })
        }
        // Hashing password

        let salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).json({
            success: true,
            message: __("passwordUpdated")
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: __("errorUpdateUserPasswordApi"),
            error
        })
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).json({
                success: false,
                message: __("provideAllFields")
            })
        }

        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(500).json({
                success: false,
                message: __("userNotFoundInvalidAnswer")
            })
        }
        let salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).json({
            success: true,
            message: __("passwordResetSuccess")
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: __("errorResetPasswordApi"),
            error
        })
    }
}

const deleteUserController = async (req, res) => {
    try {
        const id = req.params.id
        await userModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: __("yourAccoundDeleted")
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: __("errorDeleteUserApi"),
            error
        })
    }
}

module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteUserController
}