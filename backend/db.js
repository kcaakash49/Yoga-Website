const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting DB", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  address: String,
  phone: String,
  photoURL: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  status: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique:true
  },
  class: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classes',
      required: true
    }
  ],
  addedAt: {
    type: Date,
    default: Date.now
  }
});


const purchasedClassSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classes',
      required: true
    }
  ],
  purchasedAt: {
    type: Date,
    default: Date.now
  }
});

const Users = mongoose.model("users", userSchema);
const Classes = mongoose.model("classes", classSchema);
const Cart = mongoose.model("cart", cartItemSchema);
const PurchasedClass = mongoose.model("purchase", purchasedClassSchema)

module.exports = { Users, Classes, Cart, PurchasedClass };
