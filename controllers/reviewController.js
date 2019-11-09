const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/appError");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.json({
    status: "success",
    results: reviews.length,
    data: { reviews }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
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
