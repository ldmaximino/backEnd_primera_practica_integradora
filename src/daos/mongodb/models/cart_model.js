import { Schema, model } from "mongoose";

export const cartsCollectionName = "cart";

// The subschema is defined for the products in the cart
const productSchema = new Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

// The main schema is defined
const cartSchema = new Schema({
  products: {
    type: [productSchema],
    default: [] 
  }
})

export const CartModel = model(cartsCollectionName, cartSchema);