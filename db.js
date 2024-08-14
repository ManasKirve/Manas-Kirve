const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MONGO_URL;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const foodItemCollection = db.collection('food_item');
        const foodCategoryCollection = db.collection('food_Category');

        const foodItems = await foodItemCollection.find({}).toArray();
        const foodCategories = await foodCategoryCollection.find({}).toArray();

        global.food_items = foodItems;
        global.foodCategory = foodCategories;

        console.log("Data fetched and assigned to global variables");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = mongoDB;
