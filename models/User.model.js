const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    // unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const UserModel = model("user", userSchema);

module.exports = UserModel
