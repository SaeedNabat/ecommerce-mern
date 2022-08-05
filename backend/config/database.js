const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con=>{
        console.info(`MongoDB database connected with host : ${con.connection.host}`);
    }).catch(err=>{
        console.error(`error happened: ${err}`);
    });
}
module.exports = connectDatabase;