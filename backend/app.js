const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const cookieParser = require('cookie-parser');
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser());

const errorMiddleware = require('./middlewares/errors');
app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)
app.use(errorMiddleware)
module.exports = app;