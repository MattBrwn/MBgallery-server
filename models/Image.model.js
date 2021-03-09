const { Schema, model } = require("mongoose");

const ImageSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: ['Landscape', 'People', 'Nature', 'Black and White', 'Available Light', 'Details', 'Cats'],
    required: true
  },
  
  description: String,

  price: Number
});

const ImageModel = model("image", ImageSchema);

module.exports = ImageModel