const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect(
    process.env.DATABASE_URL
  )
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting DB", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  purchasedClasses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes'
  }],
  cartItems : [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Cart"
  }]
});

const classSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
})

const cartSchema = new mongoose.Schema({
    title: String,
    price: Number
})


const Users = mongoose.model("users", userSchema);
const Classes = mongoose.model("classes", classSchema)
const Cart = mongoose.model("cart", cartSchema)

module.exports = { Users, Classes, Cart };
