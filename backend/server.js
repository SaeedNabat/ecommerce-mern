const app = require('./app')
const dotenv = require('dotenv')


const connectDatabase = require('./config/database')
const {getProducts} = require('./controllers/productController')
dotenv.config({
    path:"backend/config/config.env"
})

// connect to shop it mongodb database
connectDatabase();

app.listen(process.env.PORT,(err)=>{
    if (err) {
        console.log(err)
    }
    console.log(`server running on port ${process.env.PORT} & ${process.env.ENVIRONMENT} environment`);
})