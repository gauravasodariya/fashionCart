const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();
const PORT=process.env.PORT

const app = express();

// Core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  authSource: 'admin'
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Routes (mounted under /api/v1)
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/v1', userRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', contactRoutes);
app.use('/api/v1', paymentRoutes);

// Start server
const port = PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
