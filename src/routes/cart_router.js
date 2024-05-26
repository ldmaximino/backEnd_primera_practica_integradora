//Third party imports
import { Router } from "express";

//Local imports
import * as controller from "../controllers/cart_controller.js";

const router = Router();

router.get('/', controller.getAllCarts);

router.get('/:cid', controller.getCartById);

router.post('/', controller.createCart);

router.post('/:cid/product/:pid', controller.saveProductToCart);

export default router;
