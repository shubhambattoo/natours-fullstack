const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/appError");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.json({
    status: "success",
    results: reviews.length,
    data: { reviews }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  const { review, rating, tour } = req.body;

  const newReview = await Review.create({
    review,
    rating,
    user: req.user.id,
    tour
  });

  res.status(201).json({
    status: "success",
    data: {
      review: newReview
    }
  });
});
