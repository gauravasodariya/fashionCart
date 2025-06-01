const Product = require('../models/Product');
const Review = require('../models/Review');

async function getProducts(req, res) {
  try {
    const { keyword = '', category, page = 1, minRating, priceMin, priceMax, sort } = req.query;
    const resultsPerPage = 4;
    const query = {};
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }
    if (category) {
      query.category = category;
    }
    if (priceMin !== undefined || priceMax !== undefined) {
      const priceQuery = {};
      if (priceMin !== undefined) priceQuery.$gte = Number(priceMin);
      if (priceMax !== undefined) priceQuery.$lte = Number(priceMax);
      query.price = priceQuery;
    }
    let baseIdsDocs = await Product.find(query).select('_id');
    let baseIds = baseIdsDocs.map((d) => d._id);
    if (minRating !== undefined) {
      const threshold = Number(minRating);
      if (baseIds.length > 0) {
        const ratingAggForFilter = await Review.aggregate([
          { $match: { product: { $in: baseIds } } },
          { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
          { $match: { avgRating: { $gte: threshold } } },
        ]);
        const allowedIds = new Set(ratingAggForFilter.map((r) => r._id.toString()));
        baseIds = baseIds.filter((id) => allowedIds.has(id.toString()));
      }
    }
    const sortObj = {};
    if (sort === 'price_asc') sortObj.price = 1;
    if (sort === 'price_desc') sortObj.price = -1;
    const productCount = baseIds.length;
    const totalPages = Math.ceil(productCount / resultsPerPage) || 1;
    const products = await Product.find({ ...query, _id: { $in: baseIds } })
      .sort(sortObj)
      .skip((page - 1) * resultsPerPage)
      .limit(resultsPerPage);
    const productIds = products.map((p) => p._id);
    let ratingsMap = {};
    if (productIds.length > 0) {
      const ratingAgg = await Review.aggregate([
        { $match: { product: { $in: productIds } } },
        { $group: { _id: '$product', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
      ]);
      ratingsMap = ratingAgg.reduce((acc, r) => {
        acc[r._id.toString()] = { avgRating: Number((r.avgRating || 0).toFixed(1)), count: r.count || 0 };
        return acc;
      }, {});
    }
    const productsWithRatings = products.map((p) => {
      const key = p._id.toString();
      const info = ratingsMap[key] || { avgRating: 0, count: 0 };
      return { ...p.toObject(), ratings: info.avgRating, numOfReviews: info.count };
    });
    res.status(200).json({ success: true, products: productsWithRatings, productCount, resultsPerPage, totalPages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const reviews = await Review.find({ product: product._id }).populate('user', 'name');
    const numOfReviews = reviews.length;
    const avgRatingRaw = reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / (numOfReviews || 1);
    const ratings = Number((avgRatingRaw || 0).toFixed(1));
    const reviewsForClient = reviews.map((r) => ({
      _id: r._id,
      rating: r.rating,
      comment: r.comment || '',
      name: r.user?.name || 'Anonymous',
    }));
    const productObj = { ...product.toObject(), ratings, numOfReviews, reviews: reviewsForClient };
    res.status(200).json({ success: true, product: productObj });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function putReview(req, res) {
  try {
    const { rating, comment, productId } = req.body;
    if (!rating || !productId) {
      return res.status(400).json({ success: false, message: 'Rating and productId are required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const existing = await Review.findOne({ product: productId, user: req.user._id });
    if (existing) {
      existing.rating = rating;
      existing.comment = comment || '';
      await existing.save();
    } else {
      await Review.create({ product: productId, user: req.user._id, name: req.user.name, rating, comment: comment || '' });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getAdminProducts(req, res) {
  const products = await Product.find();
  res.status(200).json({ success: true, products });
}

async function createProduct(req, res) {
  try {
    const { name, description, price, stock, category } = req.body;
    let imagesInput = [];
    if (typeof req.body.image === 'string') {
      try { imagesInput = JSON.parse(req.body.image) || []; } catch (_) {}
    } else if (Array.isArray(req.body.image)) {
      imagesInput = req.body.image;
    }
    if (req.files) {
      const files = [];
      if (Array.isArray(req.files.images)) files.push(...req.files.images);
      else if (req.files.images) files.push(req.files.images);
      if (Array.isArray(req.files.image)) files.push(...req.files.image);
      else if (req.files.image) files.push(req.files.image);
      if (files.length) {
        imagesInput = files.map(() => ({ url: '/images/sample1.jpg' }));
      }
    }
    const image = imagesInput.length ? imagesInput.map((img) => ({ url: img.url || img })) : [{ url: '/images/sample1.jpg' }];
    const product = await Product.create({ name, description, price, stock, category, image, user: req.user._id });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updateProduct(req, res) {
  try {
    const updates = {};
    const fields = ['name', 'description', 'price', 'stock', 'category'];
    fields.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });
    let imagesInput = [];
    if (typeof req.body.image === 'string') { try { imagesInput = JSON.parse(req.body.image) || []; } catch (_) {} }
    else if (Array.isArray(req.body.image)) { imagesInput = req.body.image; }
    if (req.files) {
      const files = [];
      if (Array.isArray(req.files.images)) files.push(...req.files.images);
      else if (req.files.images) files.push(req.files.images);
      if (Array.isArray(req.files.image)) files.push(...req.files.image);
      else if (req.files.image) files.push(req.files.image);
      if (files.length) {
        imagesInput = files.map(() => ({ url: '/images/sample1.jpg' }));
      }
    }
    if (imagesInput.length) {
      updates.image = imagesInput.map((img) => ({ url: img.url || img }));
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getAdminReviews(req, res) {
  try {
    const { id: productId } = req.query;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'productId required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const reviews = await Review.find({ product: productId }).populate('user', 'name');
    const reviewsForClient = reviews.map((r) => ({
      _id: r._id,
      rating: r.rating,
      comment: r.comment || '',
      name: r.user?.name || 'Anonymous',
    }));
    return res.status(200).json({ success: true, reviews: reviewsForClient });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteAdminReview(req, res) {
  try {
    const { productId, id: reviewId } = req.query;
    if (!productId || !reviewId) {
      return res.status(400).json({ success: false, message: 'productId and reviewId required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const deleted = await Review.findOneAndDelete({ _id: reviewId, product: productId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    return res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getProducts,
  getProductById,
  putReview,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminReviews,
  deleteAdminReview,
};
