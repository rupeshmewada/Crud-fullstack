import mongoose from "mongoose";
import mongodb from "mongodb"
import dotenv from 'dotenv';
dotenv.config()

// const url = 'mongodb://localhost:27017/cruddb'
const MONGODB_URI = process.env.MONGODB_URI;
// console.log(MONGODB_URI);

// const MONGODB_URI =  "mongodb+srv://bunty:bunty123@cluster0.e0ugo.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0"
// console.log("connecting to");

const connection = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

// const connection = mongoose.connect(MONGODB_URI)
const crudSchema = mongoose.Schema({
    id:Number,
    name:String,
    age:Number,
    mobile:Number,
    email:String,
    gender:String,
    city:String,

})

const crudModel = mongoose.model('user_collections', crudSchema)
export default crudModel
