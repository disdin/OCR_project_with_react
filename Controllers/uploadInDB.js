import mongoose from "mongoose";
import schema from '../model/schema.js';

const Image = mongoose.model("imageInfo", schema.imageSchema);

function uploadInDB(req, res){
    // console.log(req.output);

    Image.findOne({ output: req.output }, function (err, foundOutput) {
        if (err) console.log("Error (signup): ", err);

        if (!foundOutput) {
            //ensuring no duplicate entry or signup
            var image = req.data;
            var output = req.output;

            const newImage = new Image({
                ImgNum : output,
                Image : image
            });
            newImage.save();
        }
    });
}

export default uploadInDB;