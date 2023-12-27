import authModel from "../models/authModel.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
class AuthController 
{
    static userRegister =async (req,resp)=>{
        console.log(req)
        // resp.send("hi")
        // const reqBody = await req.json()
        const {password,username,email} = req.body
        try {
            if (username && password && email) {
                const isUser = await authModel.findOne({email:email})
                if (!isUser) 
                {
                    const genSalt = await bcryptjs.genSalt(10)
                    const hashedPassword = await bcryptjs.hash(password,genSalt)
                    const newUser = new authModel({
                        username,
                        email,
                        password:hashedPassword,
                    })
                    const savedUser = await newUser.save()
                    if (savedUser) {
                        return resp.status(200).json({message:'Congrat new user created successfull'})                        
                    }
                    else{
                        return resp.status(400).json({message:'some error occured'})
                    }
                }
                else{
                    return resp.status(400).json({message:'email already register'})
                }
            }
            else{
                return resp.status(400).json({message:'All fields are required'})
            }
        } catch (error) {
            return resp.status(400).json({message:'Something gone wrong'})
        }
    }
    static userLogin =async (req,resp)=>{
        const {email,password} = req.body
        try {
            if (email && password) {
                const isEmail = await authModel.findOne({email:email})
                if(isEmail){
console.log('entered')
if (isEmail.email === email && (await bcryptjs.compare(password,isEmail.password))) {
    const token = jwt.sign({userID:isEmail._id},"pleaseSubscribe",{expiresIn:'2d'});
    return resp.status(200).json({
        message:'Loged In Successfully',
        token,
        name:isEmail.username
    })
}else{
            return resp.status(400).json({message:'wrong password or credential added'})
}
                }
                else{
            return resp.status(400).json({message:'Wrong email entered'})
                }
            }
            else{
            return resp.status(400).json({message:'All field are required'})
            }
        } catch (error) {
            return resp.status(400).json({message:'some thing gone wrong'})
        }
    }
}

export default AuthController