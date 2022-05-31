import multer from 'multer';
import path from 'path';

const department_fileFilter = (req, file, cb) => {
  // console.log(req);
  // console.log(file);
  if (
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "jpeg"||
    file.mimetype.split("/")[1] === "svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not a png/jpg/jpeg"), false);
  }
};

export const upload = multer({
  storage: multer.diskStorage({
    filename : (req,file,cb)=>{
      cb(null,`${file.fieldname}-${Date.now}${path.extname(file.originalname)}`)
    }
  }),
  fileFilter: department_fileFilter,
});




