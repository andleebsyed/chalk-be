const { Label } = require("../models/labels-model");
const { User } = require("../models/users-model");

const AddLabel = async (req, res) => {
  try {
    const { userId, labelName } = req.body;
    const user = await User.findById(userId);

    const label = new Label({ labelName, author: userId });
    const response = await label.save();
    const { _id } = response;
    console.log({ _id });
    user.labels.push(_id);
    const updatedUser = await user.save();
    res.json({
      status: true,
      message: "label added successfully",
      response,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "failed to add the label",
      errorDetail: error?.message,
    });
  }
};

module.exports = { AddLabel };
