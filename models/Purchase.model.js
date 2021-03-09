const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const PurchaseSchema = new Schema({
  buyer_id: {
    type: Schema.Types.ObjectId, ref: 'user'
    },
  image_id: {
      type: Schema.Types.ObjectId, ref: 'image'
      },
  totalprice: Number,
  date: Date
});

const PurchaseModel = model("purchase", PurchaseSchema);

module.exports = PurchaseModel;