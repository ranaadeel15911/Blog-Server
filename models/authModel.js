import mongoose  from "mongoose";
const authSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
    type:String,
},
})

const authModel = mongoose.model("usings",authSchema)
export default authModel

