const mongoose=require("mongoose");
const validator=require('validator');
const User = require('./user');



const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,  
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
   userId: {
    type: mongoose.Schema.Types.ObjectId, // This defines the type as ObjectId
    ref: 'User', // This tells Mongoose to refer to the User model
    required: true
  }
}, {
  timestamps: true 
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
