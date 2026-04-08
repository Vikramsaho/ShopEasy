const dotenv = require("dotenv")

dotenv.config({ path: '.env' }) // Load .env from current directory (backend folder)

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const signup = require("./route/SignupRoute")
const loginController = require('./route/LoginRoute');
const productController = require('./route/ProductRoute');
const getProductData = require('./route/GetProductDataRoute')
const orderController = require('./route/OrderRoute');
const profileRoute = require('./route/ProfileRoute')

// Connect to database
connectDB();

const app = express()

// middleware
app.use(cors()); // allow all origins for development
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/signup', signup);
app.use('/login', loginController);
app.use('/product', productController); // POST only - for creating products
app.use('/product', getProductData); // GET only - for fetching products
app.use('/order', orderController); // Order management endpoints
app.use('/profile', profileRoute);

// Basic health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'E-Commerce Backend API is running', status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));