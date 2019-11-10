const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require("./userModel");

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
      required: [true, "it should have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult"
      }
    },
    price: {
      type: Number,
      required: [true, "a tour must have a price"]
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1"],
      max: [5, "Rating must be less than or equal to 5"],
      set: function(val) {
        return Math.round(val + 10) / 10;
      }
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // wont work on update
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price"
      }
    },
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
    },
    secretTour: {
      type: Boolean,
      default: false
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"]
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"]
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" });

// VIRTUAL Properties
tourSchema.virtual("durationWeeks").get(function() {
  return this.duration / 7;
});

tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id"
});

// DOCUMENT Middleware
tourSchema.pre("save", function(next) {
  const doc = this;
  doc.slug = slugify(doc.name, { lower: true });
  next();
});

// tourSchema.pre("save", async function(next) {
//   const guides = await Promise.all(
//     this.guides.map(async id => User.findById(id))
//   );
//   this.guides = guides;
//   next();
// });

// tourSchema.post("save", function (doc, next) {
//   console.log(doc, "doc saved");
//   next();
// })

// QUERY Middleware
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt"
  });
  next();
});

// tourSchema.post(/^find/, function(docs, next) {
//   console.log(docs)
//   next();
// });

// AGGREGATION Middleware
// tourSchema.pre("aggregate", function(next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   next();
// });

// eslint-disable-next-line new-cap
const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;
