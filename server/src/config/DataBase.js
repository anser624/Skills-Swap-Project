const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

async function connectToDb(){
    await mongoose.connect(process.env.DATABASEURL)
}

module.exports={
    connectToDb
}