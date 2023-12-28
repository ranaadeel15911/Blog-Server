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
      cb(null, `public/upload/`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })
                    /* Multer Config  */

router.post('/user/register',AuthController.userRegister)
router.post('/user/login',AuthController.userLogin)
//protected route
router.get('/get/allblogs',checkIsUserAuthenticated,BlogController.getAllBlogs)
router.post('/add'/* , upload.single("thumbnail")  */,checkIsUserAuthenticated,BlogController.addNewBlog)
router.get('/get/blog/:id',checkIsUserAuthenticated,BlogController.getSingleBlog)
router.delete('/delete/blog/:id',BlogController.deleteSingleBlog)

router.get('/get/categories',checkIsUserAuthenticated,CategoryControllers.getAllCategories)
router.post('/add/category',checkIsUserAuthenticated,CategoryControllers.addNewCategory)
export default router












