import jwt from 'jsonwebtoken'
import authModel from '../models/authModel.js';
const checkIsUserAuthenticated = async(req,resp,next)=>{
    // console.log(req.user)
let token;
// console.log(req)
const {authorization} = req.headers
if(authorization && authorization.startsWith("Bearer")){
try {
    console.log(authorization)
    token = authorization.split(" ")[1]
    console.log(token)
    // verify token
    // const {userID} = jwt.verify(token,"pleaseSubscribe") 
    let id = jwt.verify(token,"pleaseSubscribe")
id = id.userID
    console.log(id)
    //get user from token
    req.user = await authModel.findById(id).select("-password")
    //here we added in req array to the user and stored all we data of current user we can see console of line 22 and we can get it now 
    // in any route by this req.user._id
    //we can also give custom name to it like req.adeel
    // console.log(req.adeel)
    console.log(req.user)
    next()
} catch (error) {
    resp.status(400).json({message:'Unauthorized user'})
}
}
else{
resp.status(400).json({message:'unauthorized user'})
}
}
export default checkIsUserAuthenticated