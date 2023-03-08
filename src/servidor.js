import express from 'express';
import ProductManager from './ProductManager/ProductManager.js';

const PORT = process.env.PORT || 8080;

const productsManagers = new ProductManager('../data/products.json')

const app = express();

app.get('/products', async (req, res) => {
    try {
        const products = await productsManagers.getProducts()
        const limitValue = (req.query.limit);
        
        if(!limitValue){
            res.json(products);
        } else {
            const productLimit = [];
            for (let i = 0; limitValue && i < 5; i++) {
                productLimit.push(products[i])
            }
            res.json(productLimit);
        }
    } 
    catch (error) {
        console.log(error);
    }
});

app.get('/products/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const productById = await productsManagers.getProductsById(+pid)
        productById ? res.json(productById) : res.json({message: 'Error'})
    } 
    catch (error) {
        console.log(error);
    }
});


app.listen(PORT, () => {
    console.log(PORT);
});