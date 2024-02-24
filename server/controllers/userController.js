const User = require("../models/UserModel");
require("dotenv").config();

const UserController = {};

UserController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(401).json({ error: "User already exists" });

    const newUser = await User.create({ username, password });
    res.locals.user = newUser;
    console.log(newUser)
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

UserController.verifyUser = async (req, res, next) => {
  console.log('------in verify')
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user)
      return res
        .status(401)
        .json({
          message:
            "Invalid credentials. Please check your username/password and try again.",
        });
    res.locals.user = user;
    res.cookie('username', username)
    
    console.log(user)
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

  UserController.editBio = async (req, res, next) => {
    try {
      const { username, bio } = req.body;
      console.log(username, bio);
      const editedUser = await User.findOneAndUpdate({ username: username },{bio: bio});
      res.locals.user = editedUser;
      console.log(editedUser)
      return next();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  UserController.validateCookie = async (req, res, next) => {
    try {
      const { cookies } = req;
      if ('username' in cookies){
        console.log('logged in')
        next()
      } else {
        res.status(400).json({msg: 'User not logged in, has no cookie.'})
      }
      return next();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };




module.exports = UserController;
