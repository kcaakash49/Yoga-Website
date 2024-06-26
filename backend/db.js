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
  cartItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  videoLink: { type: String, required: true },
  instructorName: { type: String, required: true },
  instructorEmail: { type: String, required: true },
  totalEnrolled: { type: Number, required: true },
  reason: { type: String, required: false },
  status:{type:String, required:true},
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const cartSchema = new mongoose.Schema({
  title: String,
  price: Number
})


const Users = mongoose.model("users", userSchema);
const Classes = mongoose.model("classes", classSchema)
const Cart = mongoose.model("cart", cartSchema)

module.exports = { Users, Classes, Cart };
