import Products from '../dao/dbManager/products.js'
import Carts from '../dao/dbManager/carts.js';

const productsManager = new Products();
const cartsManager = new Carts();

export const getAllProducts = async () => {
    const result = await productsManager.getAll(); 
    return result;
};

export const getProductsPaginate = async (limit, page, sort, category, stock) => {
    let query = {};
    if(category) query = {category : `${category}`};
    if(stock) query = {stock : `${stock}`};
    if(category && stock) query = {$and: [ {category : `${category}`},{stock : `${stock}`} ]}  

    const result = await productsManager.getAllPage(limit, page, sort, query)

    return result;
};

export const getCart = async (cid) => {
    const result = await cartsManager.getById(cid);
    return result;
};