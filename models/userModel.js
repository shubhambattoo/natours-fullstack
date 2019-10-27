const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "a name is required"]
  },
  email: {
    type: String,
    required: [true, "an email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  photo: String,
  password: {
    type: String,
    required: [true, "a password is required"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "a passwordConfirm is required"],
    validate: {
      // This only works on CREATE and SAVE
      validator: function(el) {
        return el === this.password;
      },
      message: "password should match the confirm password"
    }
  }
});

userSchema.pre("save", async function(next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();

    user.password = await bcrypt.hash(user.password, 10);

    user.passwordConfirm = undefined;
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});

userSchema.methods.comparePassword = async function(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
};

// eslint-disable-next-line new-cap
const User = new mongoose.model("User", userSchema);

module.exports = User;
