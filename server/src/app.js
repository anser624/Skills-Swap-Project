const express = require("express");
const { connectToDb } = require("./config/DataBase");
const { authRouter } = require("./router/Auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { usersData } = require("./router/Data");
const mongoose = require("mongoose");



const dotenv = require('dotenv');

dotenv.config()

const app = express();
connectToDb()

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// DB Health Check Route
app.get("/db-check", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      return res.status(200).json({ status: "✅ Connected to MongoDB" });
    } else if (mongoose.connection.readyState === 2) {
      return res.status(200).json({ status: "⏳ Connecting to MongoDB..." });
    } else {
      return res.status(500).json({ status: "❌ Not Connected to MongoDB" });
    }
  } catch (error) {
    console.error("DB Check Error:", error);
    return res.status(500).json({ status: "❌ Error checking DB connection" });
  }
});


app.options("/", cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  credentials: true
}));

console.log(process.env.DATABASEURL)

app.get("/", (req, res) => {
  res.send("✅ Server is running on Vercel!");
});


app.use("/auth", authRouter);
app.use("/data", usersData);


app.listen(process.env.PORT, (req, res) => {
  console.log("Server Started on Port 3000 !!");
  console.log("http://localhost:3000");
});




module.exports = app;