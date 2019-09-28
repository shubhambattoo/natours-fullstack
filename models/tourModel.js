const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price : {
    type : Number,
    required : true
  },
  rating : {
    type : Number,
    default : 4.5 
  }
});

const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;