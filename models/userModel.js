const crypto = require("crypto");
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
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user"
  },
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
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
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

userSchema.pre("save", async function(next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.comparePassword = async function(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    // console.log(this.passwordChangedAt, JWTTimestamp);
    const d = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < d;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// eslint-disable-next-line new-cap
const User = new mongoose.model("User", userSchema);

module.exports = User;
