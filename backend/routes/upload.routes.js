import express from "express";
import multer from "multer";
import path from 'path'
import { __dirname } from "../index.js";
import { uploadHandler } from "../controllers/products.controllers.js";



const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , path.resolve(__dirname , 'public/images'))
    },
    filename: function (req, file, cb) {
        cb(null ,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
      }
})


// function to check whether the file uploaded is image and what is the extension of the file 

function checkFileUpload (){
    // filetypes that are supported 
    const filetypes = /jpeg|png|webp/

    // mime tells about the media type it stands for multimedia internet mail extension 
    const mimetypes = /image\/jpeg|image\/png|image\/webp/;

    // initially path.extname(file.originalname) gives the extname like the .jpg and all and then filetypes.test(...) is used to check whether that type is what we are supporting 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // checks the mime type 
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error('Images only!'), false);
      }
    

}

const upload = multer({ storage, checkFileUpload})

// creating the route for image upload 
router.post('/', upload.single('image'), uploadHandler)

export default router