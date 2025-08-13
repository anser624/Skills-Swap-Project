const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

let isConnected = false;

async function connectToDb() {
    if (isConnected) return;
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(process.env.DATABASEURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000
        });
        console.log("✅ MongoDB Connected Successfully");
        isConnected = true;
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

module.exports = {
    connectToDb
}