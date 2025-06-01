const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter your name'],
      maxLength: [25, 'Invalid name. Please enter a name with fewer than 25 characters'],
      minLength: [3, 'Name should contain more than 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please Enter your password'],
      minLength: [8, 'Password should be greater than 8 characters'],
      select: false,
    },
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Password hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.getJWTToken = function () {
  const expires = process.env.JWT_EXPIRE && process.env.JWT_EXPIRE.trim() ? process.env.JWT_EXPIRE.trim() : '7d';
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: expires,
  });
};

userSchema.methods.comparePassword = async function (userEnteredPassword) {
  return await bcryptjs.compare(userEnteredPassword, this.password);
};

// generating token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
