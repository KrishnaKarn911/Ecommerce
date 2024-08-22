const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
}, {
  timestamps: true 
});

userSchema.methods.addToCart=function(product){

  if (!this.cart) {
        this.cart = { items: [] };
    }
    
    const cartProductIndex = this.cart.items.findIndex(cp=>{
      return cp.productId.toString()===product._id.toString();
    });
    let newQuantity=1;
    const updateCartItems = [...this.cart.items];

    if(cartProductIndex>=0){
      newQuantity = this.cart.items[cartProductIndex].quantity +1;
      updateCartItems[cartProductIndex].quantity=newQuantity;
    }else{
      updateCartItems.push({
        productId: product._id,
        quantity: newQuantity
      })
    }

    const updatedCart={
      items: updateCartItems
    };
    this.cart=updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function(productId){
  const updatedCartItems = this.cart.items.filter(item=>{
    return item.productId.toString() !== productId.toString();
  });
  console.log("From Instance",updatedCartItems);
  this.cart.items = updatedCartItems;
  return this.save();
}

const User = mongoose.model('User', userSchema);

module.exports = User;
