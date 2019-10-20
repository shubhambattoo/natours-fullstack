const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

// const checkId = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   const id = parseInt(val);

//   const tour = tours.find(el => el.id === id);
//   if (!tour) {
//     return res.status(404).json({
//       status: "fail",
//       message: "invalid id."
//     });
//   } else {
//     next();
//   }
// }

const aliasTopTours = async (req, res, next) => {
  req.query = {
    sort: "price -ratingsAverage",
    limit: "5",
    fields: "name,price, duration, summary, ratingsAverage"
  };
  next();
};

const getTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours }
    });
  } catch (error) {
    // console.log(error);
    res.status(404).json({
      status: "fail",
      message: error
    });
  }
};

const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      mesaage: error
    });
  }
};

const getTour = async (req, res) => {
  try {
    const id = req.params.id;

    const tour = await Tour.findById(id);

    res.json({
      status: "success",
      data: { tour }
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      mesaage: error
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const id = req.params.id;

    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      status: "success",
      data: { tour }
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      mesaage: error
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;

    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      mesaage: error
    });
  }
};

module.exports = {
  getTour,
  createTour,
  getTours,
  updateTour,
  deleteTour,
  aliasTopTours
};
