import { CartModel } from "./models/cart_model.js";

export default class CartDaoMongoDB {
  constructor() {
  }

  async getAllCarts() {
    try {
      const carts = await CartModel.find({});
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(object) {
    try {
      const cart = await CartModel.create(object);
      return {status: 'Cart added', cart};
    } catch (error) {
      throw new Error(error);
    }
  }

  async saveProductToCart(cid, pid) {
    try {
        /* Method of updating cart products using findIndex
            const cart = await CartModel.findById(cid);
            const findProductInCart = cart.products.findIndex(
                (prod) => prod.product === pid
            );
            if(findProductInCart === -1) {
                cart.products.push({product: pid, quantity: 1});
            } else {
                cart.products[findProductInCart].quantity ++;
            }
            const updateCart = await cart.save();
            return updateCart;
        */
        // Method of updating cart products using Mongoose's FindOneAndUpdate
        const cart = await CartModel.findOneAndUpdate(
            { _id: cid, "products.product": pid },
            { $inc: { "products.$.quantity": 1 } },
            { new: true }
        );
    
        if (!cart) {
        // Product not found, add to the cart
        const updatedCart = await CartModel.findByIdAndUpdate(
            cid,
            { $push: { products: { product: pid, quantity: 1 } } },
            { new: true }
        );
        return {status: 'Cart updated', updatedCart};
        } else {
            return {status: 'Product added to cart', cart};
        }
    } catch (error) {
      throw new Error(error);
    }
  }
}
