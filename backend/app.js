const express = require('express');
const app = express();
const products = require('./routes/product');
app.use(express.json());
const errorMiddleware = require('./middlewares/errors');
app.use('/api/v1',products)
app.use(errorMiddleware)
module.exports = app;