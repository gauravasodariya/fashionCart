const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Product Name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please Enter Product Description'],
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Product Price'],
    maxLength: [7, 'Price cannot exceed 7 digits'],
  },
  image: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please Enter Product Category'],
  },
  stock: {
    type: Number,
    required: [true, 'Please Enter Product Stock'],
    maxLength: [5, 'Price cannot exceed 5 digits'],
    default: 1,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
