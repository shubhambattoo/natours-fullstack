const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "a tour must have a name"]
    },
    duration: {
      type: Number,
      required: [true, "a tour must have a duration"]
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"]
    },
    difficulty: {
      type: String,
      required: [true, "it should have a difficulty"]
    },
    price: {
      type: Number,
      required: [true, "a tour must have a price"]
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"]
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, "a tour must have a image cover"]
    },
    images: [String],
    startDates: [Date],
    slug: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual("durationWeeks").get(function() {
  return this.duration / 7;
});

tourSchema.pre("save", function(next) {
  const doc = this;
  doc.slug = slugify(doc.name, { lower: true });
  next();
});

// tourSchema.post("save", function (doc, next) {
//   console.log(doc, "doc saved");
//   next();
// })

const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;
