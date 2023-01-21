import mongoose from "mongoose";

var Schema = mongoose.Schema;

var imageSchema = new Schema({
  ImgNum: Number,
  Image: String
});


export default {
  imageSchema
};
