import * as service from '../services/cart_services.js';
import { getProductById} from '../services/product_services.js';

export const getAllCarts = async (req,res, next) => {
    try {
        const carts = await service.getAllCarts();
        return res.status(201).json(carts);
    } catch (error) {
      next(error);
    }
}

export const getCartById = async (req,res, next) => {
    try {
        const { cid } = req.params;
        const cart = await service.getCartById(cid);
        if (!cart) return res.status(404).json({ msg: "Cart not found" });
        return res.status(201).json(cart);
      } catch (error) {
        next(error);
      }
}

export const createCart = async (req,res, next) => {
    try {
        const cart = await service.createCart();
        return res.status(201).json(cart);
      } catch (error) {
        next(error);
      }
}

export const saveProductToCart = async (req,res, next) => {
    try {
        const {cid,pid} = req.params;
        const productExist = await getProductById(pid);
        if(!productExist) return res.status(404).json({msg:'Product not found'});
        const cartExist = await service.getCartById(cid);
        if(!cartExist) return res.status(404).json({msg:'Cart not found'});
        const addProductCart = await service.saveProductToCart(cid,pid);
        return res.status(201).json(addProductCart);
      } catch (error) {
        next(error);
      }
}

