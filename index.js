import express from 'express'
import connectToDb from './config/db.js'
import cors from 'cors'
import authRoutes from './routes/blog.js'
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
app.use(express.static(__dirname + '/public/upload'))
app.get("/",(req,resp)=>{
resp.send("API is running ...")
})
app.use('/api/v1',authRoutes)
app.listen(PORT,()=>{
    console.log("API is running on 900 port")
})