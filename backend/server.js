const app = require('./app')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

const connectDatabase = require('./config/database')

// handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.stack}`)
  console.log(`shutting down due to uncaught exceptions`)
  process.exit(1)
})
dotenv.config({
    path:"backend/config/config.env"
})
// connect to shop it mongodb database
connectDatabase();

const server = app.listen(process.env.PORT,(err)=>{
    if (err) {
        console.log(err)
    }
    console.log(`server running on port ${process.env.PORT} & ${process.env.ENVIRONMENT} environment`);
})
// setting up cloudinary config
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
process.on('unhandledRejection',err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log('shutting down the server due to unhandled promise rejection')
    server.close(()=>{
        process.exit(1);
})
})
