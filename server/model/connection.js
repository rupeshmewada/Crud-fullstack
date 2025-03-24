import mongoose from "mongoose";
import mongodb from "mongodb"

const url = 'mongodb://localhost:27017/cruddb'
const connection = mongoose.connect(url)

// const connection = mongoose.connect(MONGODB_URI).then(()=>{
//     console.log('connection successful');
// })


const crudSchema = mongoose.Schema({
    id:Number,
    name:String,
    age:Number,
    mobile:Number,
    email:String,
    gender:String,
    city:String,

})

const crudModel = mongoose.model('crud_collection', crudSchema)
export default crudModel
