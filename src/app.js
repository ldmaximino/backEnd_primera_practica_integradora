//Third party imports
import express from 'express';
import 'dotenv/config';

//Local imports
import products_router from './routes/product_router.js';
import carts_router from './routes/cart_router.js';
import { errorHandler } from './middlewares/error_handler.js';
import { __dirname } from './utils.js';
import { initMongoDB } from './daos/mongodb/connection.js';

//PORT definition
const PORT = process.env.PORT || 5003;

//app express
const app = express();

//Middlewares
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers
app.get('/', (req,res) => {
    res.send('Primera Práctica Integradora - Back End NodeJS + Express - Leandro Daniel Maximino 🔥🔥🔥🔥');
})
app.use('/api/products', products_router);
app.use('/api/carts', carts_router);

app.use(errorHandler);

//Connect to MongoDB if PERSISTENCE = MONGODB
if(process.env.PERSISTENCE === 'mongodb') initMongoDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀🚀🚀🚀`);
});
