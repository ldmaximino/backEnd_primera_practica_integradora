import 'dotenv/config';

let cartDao;

// Function that makes the Dao connection variable
const initializeCartDao = async () => {
  if (process.env.PERSISTENCE === 'fs') {
    const { __dirname } = await import('../utils.js');
    const { default: CartDaoFS } = await import('../daos/filesystem/cart_dao.js');
    cartDao = new CartDaoFS(`${__dirname}/data/carts.json`);
  } else if (process.env.PERSISTENCE === 'mongodb') {
    const { default: CartDaoMongoDB } = await import('../daos/mongodb/cart_dao.js');
    cartDao = new CartDaoMongoDB();
  } else {
    throw new Error('PERSISTENCE no definido o no soportado.');
  }
};

// Call the function to initialize 'productDao'
await initializeCartDao();

// import { __dirname } from '../utils.js';
// import CartDaoFS from '../daos/filesystem/cart_dao.js';
// const cartDao = new CartDaoFS(`${__dirname}/data/carts.json`);

// import CartDaoMongoDB from '../daos/mongodb/cart_dao.js';
// const cartDao = new CartDaoMongoDB();

export const getAllCarts = async () => {
    try {
        return await cartDao.getAllCarts();
    } catch (error) {
        throw new Error(error);
    }
}

export const getCartById = async (cid) => {
    try {
        return await cartDao.getCartById(cid);
    } catch (error) {
        throw new Error(error);
    }
}

export const createCart = async (object) => {
    try {
        return await cartDao.createCart(object);
    } catch (error) {
        throw new Error(error);
    }
}

export const saveProductToCart = async (cid,pid) => {
    try {
        return await cartDao.saveProductToCart(cid,pid);
    } catch (error) {
        throw new Error(error);
    }
}