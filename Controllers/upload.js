import multer from 'multer'
import path from 'path'
import fs from 'fs'


const storage = multer.diskStorage({
    destination: './upload',

    filename: (req, file, cb) => {
        fs.readdirSync('./upload').forEach(oldFile => {
            fs.unlink(path.join('./upload', oldFile), (err) => {
                    if (err) throw err;
                });
          });
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