import mongoose from "mongoose";
import schema from '../model/schema.js';

const Image = mongoose.model("imageInfo", schema.imageSchema);

function uploadInDB(img){
    // console.log(img.output);

    Image.findOne({ Output: img.output.toString() }, function (err, foundOutput) {
        if (err) console.log("Error (signup): ", err);        
        if (!foundOutput) {
            //ensuring no duplicate entry
            var image = img.data;
            var output = img.output;

            const newImage = new Image({
                Output : output,
                Image : image,
                Count : 1
            });
            
            newImage.save(function (errors) {
                if (errors) {
                        res.status(401).send("<h2> error in saving image in uploadDB </h2>");
                    }
                });
        }        
        if(foundOutput){
            Image.updateOne({ Output: foundOutput.Output }, {
                $set: {
                    Count: foundOutput.Count+1
                }
            },
        function (err, result) {
            if (err) {
                console.log("Error (uploadDB): ", err);
            }
            else {
                console.log("Successfully count Updated");
            }
            
        });         
        }
    });
}

export default uploadInDB;