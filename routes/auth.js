const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE WE MAKE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if user already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    // LETS VALIDATE THE DATA BEFORE WE LOG IN THE USER
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Email doesn't exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is wrong");

    // Wrong password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status.send(err.message);
  }
});

module.exports = router;
