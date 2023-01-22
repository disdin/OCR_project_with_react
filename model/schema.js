import mongoose from "mongoose";

var Schema = mongoose.Schema;

var imageSchema = new Schema({
  Output: String,
  Image: String,
  Count: Number,
});


export default {
  imageSchema
};
