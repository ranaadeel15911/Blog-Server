import mongoose, { Schema } from "mongoose";
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"categories"
    },
    description:{
    type:String,
}/* ,
    thumbnail:{
    type:String,
} */,
    user:{
    type:mongoose.Schema.Types.ObjectId,
    refer:"usings"
},/* ,
cloudinary_id:{
    type:String,
}, */

})

const blogModel = mongoose.model("blog",blogSchema)
export default blogModel