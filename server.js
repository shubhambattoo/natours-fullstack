const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify : false,
  useCreateIndex : true
}).then(() => {
  console.log("db connected successfully")
}).catch((err) => {
  console.log(err);
})

const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started on " + port);
});
