const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const {
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
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', isAuthenticatedUser, getProfile);
router.post('/logout', logout);
router.put('/profile/update', isAuthenticatedUser, updateProfile);
router.put('/password/update', isAuthenticatedUser, updatePassword);
router.post('/password/forgot', forgotPassword);
router.post('/reset/:token', resetPassword);
router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), getUserById);
router.put('/admin/user/:userId', isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);
router.delete('/admin/user/:userId', isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
