import mongoose from "mongoose";
const connectToDb = async()=>{
    try {
        const resp = await mongoose.connect("mongodb+srv://adeel:adeel193725@cluster0.uwmda7z.mongodb.net/?retryWrites=true&w=majority")
        if(resp){
            console.log('mongodb Connected Successfully')
        }    
    } catch (error) {
        console.log(error)
    }
    
}

export default connectToDb