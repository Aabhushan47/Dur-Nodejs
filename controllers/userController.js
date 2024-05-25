const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const photo = req.file ? req.file.path : "null";
    //check if user exists
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).send("enter another email");
    }
    //create new User using mongoose
    const newUser = new User({ name, email, password, photo });
    // // save to database
    const user = await newUser.save();

    //generate a token and send it in mail
    const token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      userId: user._id,
    });

    await token.save();

    //send token in mail
    sendEmail({
      from: "noreply@test.com",
      to: user.email,
      subject: "Email Confirmation Link",
      text: `Verify email by clicking link below \n\n http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}`,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) {
      return res.status(400).json({ error: "Invalid Token" });
    }
    const user = await User.findOne({ _id: token.userId });
    if (!user) {
      return res.status(400).json({ error: "Invalid User" });
    }
    if (user.isVerified) {
      return res.status(400).json({ error: "User is already verified" });
    }
    user.isVerified = true;
    await user.save();
    // generate token but after verification of mail
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    user.token = jwtToken;
    user.password = undefined;
    res.status(200).json({ message: "user is verified succesfully", user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ error: "Enter both email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "User not registered" });
    }
    if (!user.isVerified) {
      res.status(400).json({ error: "User not verified" });
    }
    const jwtToken = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET);
    user.token = jwtToken;
    user.password = undefined;

    res
      .status(200)
      .cookie("cookie", jwtToken, {
        expire: Date.now() + 99999,
        httpOnly: true,
      })
      .json({ success: "true", jwtToken, user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User doesnot exist" });
    }
    const token = new Token({
      token: crypto.randomBytes(16).toString("hex"),
      userId: user._id,
    });
    await token.save();
    sendEmail({
      from: "noreply@test.com",
      to: user.email,
      subject: "Password Reset Link",
      text: `http:\/\/${req.headers.host}\/api\/resetpassword\/${token.token}`,
    });
    res.status(200).json({ message: "link sent succesfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserData = async (req, res) => {
  const user = await User.find();
  res.send(user);
};
