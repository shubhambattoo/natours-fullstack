const Tour = require("./../models/tourModel");
const catchAsync = require("./../utils/catchAsync");

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
