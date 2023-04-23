const mongoose = require("mongoose")
exports.DBconnect = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect DB success')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}