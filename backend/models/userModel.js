const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name."],
    maxLength: [30, "Name cannot exceed 30 characters."],
    minLength: [3, "Name should have more that 4 characters."],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email."],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password."],
    minLength: [8, "Password should have more that 8 characters."],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  user.password = await bcrypt.hash(user.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  const user = this;
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  const user = this;
  return await bcrypt.compare(enteredPassword, user.password);
};

// generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  const user = this;
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex")

  // hashing and adding to to userSchema
  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
