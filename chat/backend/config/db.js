const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });

        console.log(`MongoDB connection established `);
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

module.exports = connectDB;