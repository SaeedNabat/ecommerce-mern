const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser());
dotenv.config({
    path:"backend/config/config.env"
})
const errorMiddleware = require('./middlewares/errors');
app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)
app.use('/api/v1',payment)
app.use(errorMiddleware)
module.exports = app;