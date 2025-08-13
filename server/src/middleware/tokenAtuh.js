// middleware/authMiddleware.js
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();

 const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // assuming cookie name is 'token'

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.KEY); // 👈 use your JWT secret here
    req.user = decoded; // optional, if you want to access user info later
    next();
  } catch (err) {
    return res.status(403).send("Invalid Token");
  }
};

module.exports={
    verifyToken
}