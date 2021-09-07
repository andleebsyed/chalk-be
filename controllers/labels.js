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
    const { labelId } = req.body;
    const response = await Label.deleteOne({ _id: labelId });
    return res.json({
      status: true,
      message: "label deleted successfully",
      response,
    });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ status: false, message: "failed to delete the label" });
  }
};
module.exports = { AddLabel, DeleteLabel };
