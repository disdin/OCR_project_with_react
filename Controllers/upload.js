import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: './upload',
    filename: (req, file, cb) => {
        // console.log(file);
        return cb(null, `image${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1000000000000000
    }
})
export default upload;