const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

const getUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "error",
    results: users.length,
    data: {
      users
    }
  });
});

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined"
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined"
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined"
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined"
  });
};

module.exports = {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser
};
