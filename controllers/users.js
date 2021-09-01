const { User } = require("../models/users-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SignUp = async (req, res) => {
  try {
    const secret = process.env.SECRET;
    let { userDetails } = req.body;
    const newUser = new User(userDetails);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const SavedUser = await newUser.save();
    const token = jwt.sign({ userId: SavedUser._id }, secret, {
      expiresIn: "24h",
    });
    res.json({
      status: true,
      message: "user added successfully",
      token,
      userId: SavedUser._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.json({
        status: false,
        code: 11000,
        message: "couldn't add user",
        errorDetail: error.message,
        existingField: Object.keys(error.keyPattern)[0],
      });
    }
    res.json({
      status: false,
      message: "couldn't add user",
      errorDetail: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const secret = process.env.SECRET;
    const { userDetails } = req.body;
    console.log(userDetails);
    const ourUser = await User.findOne({ username: userDetails.username });
    if (ourUser) {
      const validPassword = await bcrypt.compare(
        userDetails.password,
        ourUser.password
      );
      if (validPassword) {
        const token = jwt.sign({ userId: ourUser._id }, secret, {
          expiresIn: "24h",
        });
        res.json({
          status: true,
          allowUser: true,
          message: "logged in successfully",
          token,
          userId: ourUser._id,
        });
      } else {
        res.json({
          status: true,
          allowUser: false,
          message: "username and/or password incorrect",
        });
      }
    } else {
      res.json({
        status: true,
        allowUser: false,
        message: "username and/or password incorrect",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      errorDetail: error,
      errorMesssage: error.message,
    });
  }
};

const Account = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-__v -password -notes");
    res.json({
      status: true,
      message: "user Account fetched successfully",
      account: user,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "couldn't fetch user account",
      errorDetail: error?.message,
    });
  }
};

const UpdateAccount = async (req, res) => {
  let msg;
  try {
    const { userId, newUsername, newEmail, newName } = req.body;
    async function checkForExistingEmail() {
      const ifEmailPresent = await User.findOne({ email: newEmail });
      if (ifEmailPresent && !ifEmailPresent._id.equals(userId)) {
        return res.json({
          status: false,
          unique: false,
          message: "email already in use",
        });
      } else {
        return false;
      }
    }

    async function checkForExistingUserName() {
      const ifUsernamePresent = await User.findOne({ username: newUsername });
      if (ifUsernamePresent && !ifUsernamePresent._id.equals(userId)) {
        return res.json({
          status: false,
          unique: false,
          message: "username already in use",
        });
      } else {
        return false;
      }
    }
    const emailStatus = await checkForExistingEmail();
    const usernameStatus = await checkForExistingUserName();

    if (emailStatus === false && usernameStatus === false) {
      const response = await User.findOneAndUpdate(
        { _id: userId },
        { username: newUsername, email: newEmail, name: newName },
        { new: true }
      ).select("-__v -password -notes");
      return res.json({
        status: true,
        message: "User Updated successfully",
        response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "couldn't update user",
      newMessage: msg,
      error: error,
      errMessage: error.message,
    });
  }
};
module.exports = { SignUp, Login, Account, UpdateAccount };
