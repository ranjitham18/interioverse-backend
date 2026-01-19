//admin only actions, get all users, later delete works  verify

const User = require("../models/User");

/* GET ALL USERS */
const getAllUsers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
};

/* VERIFY USER */
const verifyUser = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { verified: true },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ verified: user.verified });
};

/* DELETE USER */
const deleteUser = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted" });
};
module.exports = {
getAllUsers,
verifyUser,
deleteUser
};