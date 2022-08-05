const Product = require('../models/product');

//create new product => /api/v1/product/new
exports.newProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
  } catch (error){
    console.log(error);
  };
};

// display all products => /api/v1/products
exports.getProducts = async (req,res)=>{
    const products = await Product.find();
    return res.status(200).json({
        success:true,
        count:products.length,
        products
    })
}

// display single product details => /api/v1/product/:id
exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            res.status(404).json({
                success:true,
                message:'product not found'
        }); 
        }
        res.status(200).json({
            success:true,
            product
    });
    } catch (error){
        console.log(error.message);
    }
}

// update product => /api/v1/product/:id
exports.updateProduct = async (req, res) => {
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
}

// delete product => /api/v1/product/:id

exports.deleteProduct = async (req, res) => {
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

    }
