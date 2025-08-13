const express = require("express");
const { connectToDb } = require("./config/DataBase");
const { authRouter } = require("./router/Auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { usersData } = require("./router/Data");



const dotenv = require('dotenv');

dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Tumhara frontend origin
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/data", usersData);

connectToDb()
  .then(() => console.log("Connect To DataBase Successfully!"))
  .catch((error) => console.log("Something Wrong To Connect Db " + error));

app.listen(process.env.PORT, (req, res) => {
  console.log("Server Started on Port 3000 !!");
  console.log("http://localhost:3000");
});


module.exports = app;