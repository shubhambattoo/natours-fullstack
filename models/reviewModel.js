// review / rating / createdAt / ref to tour / ref to user
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "a review text is required."],
      trim: true,
      minlength: [4, "review should be atleast 4 chars long"]
    },
    rating: {
      type: Number,
      required: [true, "a rating is required"],
      min: 1,
      max: 5
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "review must belong to a tour"]
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "review must belong to an author"]
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "name photo"
  }).populate({
    path: "tour",
    select: "name summary price difficulty"
  });
  next();
});

// eslint-disable-next-line new-cap
const Review = new mongoose.model("Review", reviewSchema);

module.exports = Review;
