const testUserController = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Test User Data Api'
        })
    } catch (error) {
        console.log('Error in Test Api', error)
    }
}

module.exports = {
    testUserController
}