const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  putReview,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminReviews,
  deleteAdminReview,
} = require('../controllers/productController');

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.put('/review', isAuthenticatedUser, putReview);
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.post('/admin/product/create', isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.delete('/admin/product/:productId', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.get('/admin/reviews', isAuthenticatedUser, authorizeRoles('admin'), getAdminReviews);
router.delete('/admin/reviews', isAuthenticatedUser, authorizeRoles('admin'), deleteAdminReview);

module.exports = router;
