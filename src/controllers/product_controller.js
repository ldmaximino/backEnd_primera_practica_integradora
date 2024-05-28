import * as service from "../services/product_services.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const products = await service.getAllProducts();
    if (products.length > 0) {
      if (!limit) {
        return res.status(200).json(products);
      } else {
        const productsLimit = products.slice(0, limit);
        return res.status(200).json(productsLimit);
      }
    } else return res.status(200).json({ msg: "There are not products" });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.getProductById(pid);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { code } = req.body;
    const productExist = await service.getProductByCode(code);
    if (productExist)
      return res.status(404).json({ msg: "Product already exists" });
    const product = await service.createProduct(req.body);
    if (!product.product) return res.status(404).json({ msg: "Error creating product" });
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.updateProduct(pid, req.body);
    if (!product.product) return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await service.deleteProduct(pid);
    if (!product.product) return res.status(404).json({ msg: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
