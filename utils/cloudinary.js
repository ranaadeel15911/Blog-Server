// import {v2 as cloudinary} from 'cloudinary';
// const cloudinary = require('cloudinary').v2   
// require('dotenv').config()       
// import {} from 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary} from 'cloudinary';
/* {v2 as cloudinary} means we are importing v2 but as like cloudinary thus we will use name of cloudinary at the place of v2 */
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

export default cloudinary