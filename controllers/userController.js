const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = function(obj, ...allowed) {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowed.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

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

const updateMe = catchAsync(async (req, res, next) => {
  // if the user tries to update password : ERROR
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("Cannot update password with this one", 400));
  }
  // update the user document
  const user = filterObj(req.body, "name", "email");
  const upUser = await User.findByIdAndUpdate(req.user.id, user, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: {
      user: upUser
    }
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null
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
  deleteUser,
  updateMe,
  deleteMe
};
