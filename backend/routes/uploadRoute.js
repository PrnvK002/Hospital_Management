import express from 'express';
import cloudinary from 'cloudinary';
const router = express.Router();
import { uploadDepartment } from '../middlewares/multer_image.js';
import authentication from '../middlewares/authentication.js';
import { CLOUDINARY_API_SECRET , CLOUDINARY_NAME , CLOUDINARY_API_KEY } from '../config/global.js';

cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
  });

router.post('/department',authentication,uploadDepartment.single('image'),async(req,res)=>{

    console.log(req.file);
    const image = req.file.path;
    const result = await cloudinary.uploader.upload(image);
    if(result){
        res.status(200).json({ url : result.url });
    }else{
        res.status(500);
        throw new Error('An Error occured while uploading the image');
    }

})

export default router;