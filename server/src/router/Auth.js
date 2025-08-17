const express = require("express");
const { UserAuth } = require("../models/AuthUsers");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const authRouter = express.Router();


authRouter.get('/verifyAuth', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ valid: false })
  }
  try {
    jwt.verify(token, process.env.KEY);
    console.log("JWT KEY:", process.env.KEY); // 👈 ye line add karo
    return res.status(201).json({ valid: true })
  } catch (error) {
    console.log("JWT Verification Failed:", error); // 👈 Add this
    return res.status(401).json({ valid: false }); // 👈 expired or invalid
  }
})



authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Body received:", req.body);
    const user = await UserAuth.findOne({ email: email });
    console.log("User found:", user);
    if (!user) {
      return res.status(401).json("User Not Found !");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      return res.status(401).json("Password Not Match !");
    }
    const token = jwt.sign({ email: email }, process.env.KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Vercel HTTPS use karta hai
      sameSite: "none", // ✅ Cross-origin ke liye
      expires: new Date(Date.now() + 60 * 30000),
    });
    res.status(200).json({
      message: "Login Successfully Welcome !",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        city: user.city,
        teach: user.teach,
        learn: user.learn,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password, teach, learn, city, gender } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid Email !" });
    } else if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Type a Strong password !" });
    }
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);

    const user = await new UserAuth({ name, email, password: hash });
    user.save();

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "10m",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 60 * 5000),
    });

    res.status(200).json({
      message: "Create User Successfully !",
      data: {
        name: user.name,
        email: user.email,
        gender: user.gender,
        city: user.city,
        teach: user.teach,
        learn: user.learn,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now() + 60 * 0),
  });
  // res.clearCookie("token", cookieOptions);
  res.send("Log-Out Successfully!!");
  console.log("Bas Ustad Hogaya LogOut !");
});

module.exports = {
  authRouter,
};
