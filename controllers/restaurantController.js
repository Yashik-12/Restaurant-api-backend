const { __ } = require("i18n");
const restaurantModel = require("../models/restaurantModel")

// Create Restaurant
const createRestaurantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time,
            pickup, delivery, isOpen, logoUrl,
            rating, ratingCount, code, coords } = req.body

        // Validation
        if (!title || !coords) {
            return res.status(500).json({
                success: false,
                message: __("provideTitleAddress")
            })
        }

        const newRestaurant = new restaurantModel({
            title, imageUrl, foods, time,
            pickup, delivery, isOpen, logoUrl,
            rating, ratingCount, code, coords
        })
        await newRestaurant.save()
        res.status(201).json({
            success: true,
            message: __("restaurantCreated"),
            newRestaurant
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            message: __("errorRestaurantApi"),
            error
        })
    }
}

module.exports = {
    createRestaurantController
}