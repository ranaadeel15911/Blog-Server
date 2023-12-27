import categoryModel from "../models/categoryModel.js"

class CategoryControllers{
    static getAllCategories = async (req,resp)=>{
        // resp.send({message:'hi'})
        // console.log(req.adeel._id)
        console.log(req.user._id)
        try {
            const fetchAllCategories = await categoryModel.find({})
            /* to find all the  */
            return resp.status(200).json(fetchAllCategories)
        } catch (error) {
            resp.status(400).json({message:'Somethign went wrong'})
        }
    }
    static addNewCategory = async (req,resp)=>{
        // resp.send({message:'hi'})
        const { title } = req.body
        try {
            if (title) {
                const newCategory = new categoryModel({
                    title,
                })
                const savedCategory = await newCategory.save()
                if (savedCategory) {
                resp.status(200).json({message:'New Category Added'})    
                }
                else{
                resp.status(400).json({message:'all fields are required'})
                }
            }
            else{
                resp.status(400).json({message:'all fields are required'})   
            }
        } catch (error) {
            resp.status(400).json({message:'Somethign went wrong'})   
        }
    }
}

export default CategoryControllers