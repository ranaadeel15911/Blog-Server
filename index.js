import express from 'express'
import connectToDb from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/blog.js'
import path from 'path'
const app = express()
const PORT = 'https://blog-server-eosin.vercel.app'
// const PORT = 900
connectToDb()
// app.use(cors())
app.use(cors({
    origin:["https://blog-frontend-psi-six.vercel.app","http://localhost:3000"],
    methods:["POST","GET","DELETE"],
    credentials:true
}))
app.use(express.json());
// app.use(express.static("public/upload"))
app.use(express.static('publicc'))
app.get("/",(req,resp)=>{
resp.send("API is running ...")
})
app.use('/api/v1',authRoutes)
app.listen(PORT,()=>{
    console.log("API is running on 900 port")
})


import express from 'express'
import AuthController from '../controllers/authController.js'
import BlogController from '../controllers/blogController.js'
import CategoryControllers from '../controllers/categoryController.js'
import multer from 'multer'
import checkIsUserAuthenticated from '../middlewares/authMiddleware.js'
const router = express.Router()
                        /* Multer Config */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('public/upload/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});
