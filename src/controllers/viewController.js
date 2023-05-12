import Carts from "../dao/dbManager/carts.js";
import Messages from "../dao/dbManager/messages.js";
import Products from "../dao/dbManager/products.js";
import cartsModel from "../dao/models/carts.js";
import productsModel from "../dao/models/products.js";

import { getByIdService as cart_getByIdService} from "../services/carts.service.js";
import { getAllService as product_getAllService } from "../services/products.service.js";


const productsManager = new Products();
const cartsManager = new Carts();
const messagesManager = new Messages();


export const getProductsView = async(req,res)=>{
	const { page = 1, limit = 10, sort, query} = req.query;
	const user = req.session.user
	const options = {
		page,
		limit,
		...(sort && { sort: { price: sort } })
	}

	try {
		const result = await product_getAllService(query, options);
		const payload = {
			user,
			...result
		}
		res.render('products', payload);
        } catch (error) {
            res.status(error.httpStatusCode || 500).send({ error: error.message });
        }

    // const isLogin = req.session.user ? true : false;
    // const user = req.session.user;
    // const {
    //     page=1,
    //     limit=5,
    //     sort,
    //     category="",
    // } = req.query;
    // const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = 
    // await productsModel.paginate({category:{$regex:category}} , {sort:{price:sort}, limit , page , lean:true});
    
    // const products = docs;
    // res.render('products' , {
    //     isLogin,
    //     user,
    //     products,
    //     hasPrevPage,
    //     hasNextPage,
    //     prevPage,
    //     nextPage,
    //     page
    // });
}

export const getCarView = async(req,res)=>{
    try {
        const cart = await cartsManager.getById(cartId);
        res.render('cart', { cart });
    } catch (err) {
        console.log(err);
    }
}

export const getCartId = async(req,res)=>{

    const { cid } = req.params;

	try {
		const result = await cart_getByIdService(cid);
		const productsArray = [];
		result.products.forEach(element => {
			const product = {
				quantity: element.quantity,
				...element.product._doc
			}
			productsArray.push(product);
		});
		res.render('cart', { productsArray });
        } catch (error) {
            res.status(error.httpStatusCode || 500).send({ error: error.message });
        }
    // let cid = req.params.cid;
    // let cart = await cartsModel.findById(cid).populate("products.product").lean();
    // console.log(cart);
    // let cartProducts = cart.products
    // res.render('carts' , {cart, cartProducts})
}

export const getMessageView = async(req,res)=>{
    let messages = await messagesManager.getAll();
    console.log(messages);
    res.render('chat' , {messages})
}

export const postCardToProduct = async(req,res)=>{
    const pid = req.params.id;

    try {
        let cart;
        if (!cartId) {
            cart = await cartsManager.save();
            cartId = cart._id;
        } else {
            cart = await cartsManager.getById(cartId);
        }

        const cid = cart._id;
        await cartsManager.saveId(cid, pid);

        res.redirect('/products');
    } catch (err) {
        console.log(err);
    }
}

export const getCardId = async(req,res)=>{
    const cid = req.params.cid;
    try {
        const cart = await cartsManager.getById(cid);
        res.render('cart', { cart });
    } catch (err) {
        console.log(err);
    }
}

export const getRegister = async(req,res)=>{
    res.render('register');
}

export const getLoginView = async(req,res)=>{
    res.render('login');
}

export const profileView = async(req,res)=>{
    res.render('profile', {
        user: req.session.user
    })
}

export const getView = async(req,res)=>{
        // const products = await manager.getAll();

        const products = await productsManager.getAll(); 
        res.render('home', {products});
}

export const realTimeProductsView = async(req,res)=>{
    res.render('realTimeProducts', {style: 'realTimeProducts.css'});
}

export const chatView = async(req,res)=>{
    res.render('chat')
}

var cartId;
export const viewP = async(req,res)=>{
    const { limit = 10, page = 1, sort, category, stock} = req.query;

    let query = {};
    if(category) query = {category : `${category}`};
    if(stock) query = {stock : `${stock}`};
    if(category && stock) query = {$and: [ {category : `${category}`},{stock : `${stock}`} ]}  

    const result = await productsManager.getAllPage(limit, page, sort, query)

    const products = result.docs; 
    const hasPrevPage = result.hasPrevPage;
    const prevPage = result.prevPage;
    const hasNextPage = result.hasNextPage;
    const nextPage = result.nextPage;
    const Page = result.page;
    res.render('products', {products, hasPrevPage, prevPage, hasNextPage,  nextPage, Page, cartId, user: req.session.user, style: 'home.css'})
}
export default{
    getProductsView,
    getCarView,
    getCartId,
    getMessageView,
    postCardToProduct,
    getCardId,
    getRegister,
    getLoginView,
    profileView,
    getView,
    realTimeProductsView,
    chatView,
    viewP
}

