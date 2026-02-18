# fashionCart 🛍️

A modern full-stack e-commerce platform for fashion enthusiasts, built with the MERN stack (MongoDB, Express.js, React, Node.js). 

Shop the latest fashion trends with a seamless shopping experience featuring secure payments via Razorpay, real-time order tracking, and an intuitive admin dashboard for comprehensive store management. Perfect for fashion retailers looking to establish their online presence.
## 🚀 Features

### User Features
- **User Authentication**: Register, Login, Logout with JWT-based authentication
- **Product Browsing**: View all products with pagination and filtering
- **Product Details**: Detailed product information with images and reviews
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders, view order history, and track order status
- **Payment Integration**: Razorpay payment gateway integration
- **User Profile**: Update profile information and password
- **Password Recovery**: Forgot password and reset password functionality
- **Product Reviews**: Rate and review purchased products
- **Contact Form**: Get in touch with support

### Admin Features
- **Dashboard**: Overview of orders, products, users, and reviews
- **Product Management**: Create, update, and delete products
- **Order Management**: Update order status and manage deliveries
- **User Management**: View all users and update user roles
- **Review Management**: View and manage product reviews

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Material-UI (MUI)** - UI components
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image upload and storage
- **Razorpay** - Payment processing
- **Nodemailer** - Email service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn package manager

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/gauravasodariya/fashionCart.git
cd fashionCart
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_email_password

FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory (if needed):

```env
VITE_API_URL=http://localhost:4000
```

## 🚀 Running the Application

### Development Mode

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
The backend server will run on http://localhost:4000

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
The frontend application will run on http://localhost:5173

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
fashionCart/
├── backend/
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware (auth, error handling)
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Entry point
│
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── Admin/          # Admin panel components
│   │   ├── AdminStyles/    # Admin panel styles
│   │   ├── Cart/           # Cart and checkout components
│   │   ├── CartStyles/     # Cart styles
│   │   ├── Orders/         # Order components
│   │   ├── User/           # User authentication components
│   │   ├── UserStyles/     # User styles
│   │   ├── components/     # Reusable components
│   │   ├── features/       # Redux slices
│   │   ├── pages/          # Page components
│   │   ├── app/            # Redux store configuration
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
└── README.md
```

## 👨‍💻 Author

Gaurav Asodariya
MSc IT Student, DAIICT

GitHub: https://github.com/gauravasodariya


