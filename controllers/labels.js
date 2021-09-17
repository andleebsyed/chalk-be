const { Label } = require("../models/labels-model");
const { User } = require("../models/users-model");

const AddLabel = async (req, res) => {
  try {
    const { userId, labelName } = req.body;
    const user = await User.findById(userId);
    const label = new Label({ labelName, author: userId });
    const newLabel = await label.save();
    const { _id } = newLabel;
    user.labels.push(_id);
    await user.save();
    res.json({
      status: true,
      message: "label added successfully",
      newLabel,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "failed to add the label",
      errorDetail: error?.message,
    });
  }
};

const DeleteLabel = async (req, res) => {
  try {
    const { labelId, userId } = req.body;
    const user = await User.findById(userId);
    user.labels = user.labels.filter(
      (labelIdOfUser) => !labelIdOfUser.equals(labelId)
    );
    await user.save();
    const response = await Label.deleteOne({ _id: labelId });
    res.json({
      status: true,
      message: "label deleted successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "failed to delete the label",
      errorDetail: error?.message,
    });
  }
};
module.exports = { AddLabel, DeleteLabel };
