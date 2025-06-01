const User = require('../models/User');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

function sendToken(user, statusCode, res, message = 'Success') {
  const token = user.getJWTToken();
  const options = {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.status(statusCode).cookie('token', token, options).json({ success: true, user, message });
}

async function register(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, password, and confirmPassword' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    sendToken(user, 201, res, 'Registered successfully');
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    sendToken(user, 200, res, 'Logged in successfully');
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getProfile(req, res) {
  res.status(200).json({ success: true, user: req.user });
}

function logout(req, res) {
  res.clearCookie('token').status(200).json({ success: true, message: 'Logged out' });
}

async function updateProfile(req, res) {
  try {
    const { name, email } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.status(200).json({ success: true, user, message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updatePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Old password incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get('host')}/reset/${resetToken}`;
    return res.status(200).json({ success: true, message: 'Reset link generated', resetUrl, token: resetToken });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Password and confirmPassword are required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
    const crypto = require('crypto');
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getAllUsers(req, res) {
  const users = await User.find();
  res.status(200).json({ success: true, users });
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, user });
}

async function updateUserRole(req, res) {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.userId, { role }, { new: true });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, user });
}

async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, message: 'User deleted' });
}

module.exports = {
  register,
  login,
  getProfile,
  logout,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
};

