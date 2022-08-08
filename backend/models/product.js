const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'please enter product name'],
        trim: true,
        maxLength:[100,'product name cannot exceed 100 character']
    },
    price:{
        type: Number,
        required: [true,'please enter product price'],
        maxLength:[100,'product price cannot exceed 5 characters'],
        default:0.0
    },
    description:{
        type: String,
        required: [true,'please enter product description'],
    },
    ratings:{
        type: Number,
        default:0
    },
    images:[
        {
            public_id:{
                type: String,
                required:true
            },
            url:{
                type: String,
                required:true
            }
        }
    ],
    category:{
        type: String,
        required: [true,'please enter category for this product'],
        enum:{
            values:[
                'electronics',
                'cameras',
                'laptop',
                'accessories',
                'headphones',
                'food',
                'books',
                'clothes/shoes',
                'beauty/health',
                'sports',
                'outdoor',
                'home'
            ],
            message:'please select correct category for this product'

        }
    },
    seller:{
        type: String,
        required: [true,'please enter seller for this product'],
    },
    stock:{
        type: Number,
        required: [true,'please enter stock for this product'],
        maxLength:[5,'product name cannot exceed 5 characters'],
        default:0
    },
    numOfReviews:{
        type: Number,
        default:0,
    },
    reviews:[
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true,
            },
            comment:{
                type: String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('Product',productSchema)