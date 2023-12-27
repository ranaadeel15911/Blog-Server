import blogModel from "../models/blogModel.js"
// import {cloudinary} from '../utils/cloudinary.js'
// const cloudinary = require("../utils/cloudinary.js")
import cloudinary from '../utils/cloudinary.js'
import fs from "fs"
class BlogController {
static getAllBlogs = async(req,resp)=>{
    try {
        const fetchAllBlogs= await blogModel.find({user:req.user._id})
        return resp.status(200).json(fetchAllBlogs)
    } catch (error) {
    resp.status(400).json({message:'Somethign went wrong'})   
    }
}
static addNewBlog = async(req,resp)=>{
    // resp.send({message:'hello'})
    const {title,category,description} = req.body
    // console.log(req.file)
    // const {filename} = req.file
    // const result = await cloudinary.uploader.upload(path) 

    try {
        if (title && category && description) {
            const addBlog = new blogModel({
                title:title,
                description:description,
                category:category,
                thumbnail:req.file.filename,
                // cloudinary_id:result.public_id,
                user:req.user._id
            })
            const savedBlog = await addBlog.save()
            // fs.unlinkSync(path)
            if (savedBlog) {
                resp.status(200).json({message:'Blog added successfully'})
            }
            else{
                resp.status(400).json({message:'something wrong'})
            }
        }
        else{
            resp.status(400).json({message:'All fields required'})   
        }
    } catch (error) {
        resp.status(400).json({message:'Somethign went wrong'})   
    }

}
static deleteSingleBlog = async(req,resp)=>{
    const {id} = req.params
    try {
        let deletedBlog = await blogModel.findById(id).exec()
        console.log('entered')
        await cloudinary.uploader.destroy(deletedBlog.cloudinary_id)
        await deletedBlog.deleteOne()
        return resp.status(200).json({message:'Deleted Blog Successfully'})
    } catch (error) {
        resp.status(400).json({message:'Somethign went wrong'})   
    }
}
static getSingleBlog = async(req,resp)=>{
    const {id} = req.params
    try {
        const fetchSingleBlog = await blogModel.findById(id)
        return resp.status(200).json(fetchSingleBlog)
    } catch (error) {
        resp.status(400).json({message:'Somethign went wrong'})   
    }
}
}

export default BlogController