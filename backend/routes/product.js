const express = require('express');
const { route } = require('../app');
const router = express.Router();
const {getProducts,newProduct,getSingleProduct,updateProduct,deleteProduct} = require('../controllers/productController')
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');
router.route('/products').get(getProducts)

router.route('/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct)

router.route('/product/:id').get(getSingleProduct)

router.route('/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);
module.exports = router;