//Third party imports
import { Router } from "express";

//Local imports
import { productValidator } from "../middlewares/product_validators.js";
import * as controller from "../controllers/product_controller.js";

const router = Router();

router.get("/", controller.getAllProducts);

router.get("/:pid", controller.getProductById);

router.post("/", productValidator, controller.createProduct);

router.put("/:pid", productValidator, controller.updateProduct);

router.delete("/:pid", controller.deleteProduct);

export default router;
