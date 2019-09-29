const Tour = require("./../models/tourModel");

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

const getTours = async (req, res) => {
  try {
    // Exclude from params
    // excluding query params
    const queryParams = { ...req.query };
    const excludedFields = ["page", "sort", "fields", "limit"];
    excludedFields.forEach(el => {
      delete queryParams[el];
    });

    // replace the operators
    let queryStr = JSON.stringify(queryParams);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, str => {
      return `$${str}`;
    });

    // make query
    let query = Tour.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      // console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    // Excluding fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();

      if (skip >= numTours) throw new Error("this page does not exisits");
    }

    const tours = await query;

    res.json({
      status: "success",
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours }
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      mesaage: error
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
  deleteTour
};
