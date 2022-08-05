const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

//create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
  } catch (error){
    console.log(error);
  };
});

// display all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req,res)=>{
    const resPerPage = 4;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resPerPage)
    const products = await apiFeatures.query;
    return res.status(200).json({
        success:true,
        count:products.length,
        products,
        productCount
    })
})

// display single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res,next) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
         return next(new ErrorHandler(
            'product not found',
            404
         ));
        }
        res.status(200).json({
            success:true,
            product
    });
    } catch (error){
        console.log(error.message);
    }
})

// update product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product){
            res.status(404).json({
                success:false,
                message:'product not found'
            })
        }
          product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            useValidators:true,
            useFindAndModify:false

        });
        res.status(200).json({success:true,product});
    } catch (err) {
        res.status(500).json({success:false,message:err.message});
    }
})

// delete product => /api/v1/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message:'product not found'
            })
            
        } 

        await product.remove();
        res.status(200).json({success:true,
            message:"product deleted successfully"
        });

    })
