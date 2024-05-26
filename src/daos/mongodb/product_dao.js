import { ProductModel } from "./models/product_model.js";

export default class ProductDaoMongoDB {
    async getAllProducts() {
        try {
            const products = await ProductModel.find();
            return products;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductModel.findById(id);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductByCode(code) {
        try {
            const product = await ProductModel.findOne({code});
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createProduct(object) {
        try {
            const product = await ProductModel.create(object);
            return {status: 'Product added', product};            
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, object) {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, object, {new: true});
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(id) {
        try {
            const product = await ProductModel.findByIdAndDelete(id);
            if(!product) return {message: 'Product not found'}
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }
}