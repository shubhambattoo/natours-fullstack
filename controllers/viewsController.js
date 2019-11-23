const Tour = require("./../models/tourModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");

exports.getOverview = catchAsync(async (req, res, next) => {
  // get tour data
  const tours = await Tour.find();
  // build template
  // render that template
  res.status(200).render("overview", {
    title: "All Tours",
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // get the data
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user"
  });

  if (!tour) {
    return next(new AppError("There is no tour with the name", 404));
  }

  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getLoginForm = (req, res) => {
  res.render("login", {
    title: "Log in to your account"
  });
};

exports.getAccount = (req, res) => {
  res.render("account", {
    title: "My Account"
  });
};

exports.updateUserData = async (req, res) => {
  // console.log(req.body);
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.redirect("/me");
};
