import { Router } from "express";
// import { __dirname} from '../utils';
import { purchasee, getCarts, savePostCart, postProducts, deleteProduct, putProduct, putProductToCart, deleteP} from '../controllers/cartsController.js';

import { passportCall } from "../utils.js";

const router = Router();
// const cartsManager = new Carts();
// const productManager = new Products();

router.get('/', getCarts)

router.post('/' , savePostCart)
    // const result = await cartsManager.saveCart();
    // res.send({status:"success" , payload:result});

// router.delete('/:cid' , async (req,res) => {
//     let id = req.params.cid;
//     const result = await cartsManager.deleteCart(id);
//     res.send({status:"success" , payload:result});
// })
router.post('/:cid/product/:pid' , postProducts)
    // const { cid, pid } = req.params;
    // const product = await productManager.getProductById(pid);
    // if (product.id) {
    //   const cart = await cartsManager.addProductToCart(cid, pid);
    //   res.json(cart);
    //   return;
    // }
    // res.json({ msg: `El producto con el id ${pid} no existe.` });

    // let cid = req.params.cid;
    // let pid = req.params.pid;

    // let result = await cartsManager.addProductToCart(cid,pid);
    // res.send({status:"success" , payload:result});
    
    router.delete('/:cid/product/:pid', deleteProduct )
        // let cid = req.params.cid;
    // let pid = req.params.pid;

    // let productExist = await productManager.getOne(pid);
    // if (!productExist) {
    //     res.send({ status: 404, message: "Producto no existente" });
    // }
    // else {
    //     let cart = await cartsManager.getOne(cid);
    //     if (!cart) {
    //         res.send({ status: 404, message: "El carrito no existe" });
    //     }
    //     else {
    //         let productInCartIndex = cart.products.findIndex(p => p.product === pid)
    //         if (productInCartIndex == -1) {
    //             res.send({ status: 404, message: "El producto no existe dentro del carrito" });
    //         }
    //         else {
    //             cart.products.splice(productInCartIndex, 1);
    //             let result = await cartsManager.updateCart(cid, cart);
    //             res.send({ status: "Ok", payload: result });
    //         }
    //     }


    // }
    
    
    
    router.put('/:cid', putProduct)
    // let cid = req.params.cid;
    // let products = req.body;

    // let cart = await cartsManager.getOne(cid);
    // let cartProducts = cart.products;

    // let productsIds = [];
    // if (cartProducts.length > 0) {
    //     cartProducts.forEach(product => {
    //         productsIds.push(product._id);
    //     })
    // }

    // products.forEach(async(product) => {
    //     let productIndex = productsIds.findIndex((p)=> p == product._id);
    
    //     if (productIndex != -1) {
    //         cartProducts[productIndex].quantity = product.quantity;
    //     } else {
    //         cartProducts.push(product);
    //     }
    // })

    // cart.products = cartProducts;
    // let result = await cartsManager.updateCart(cid, cart);
    // res.send({status:"success" , payload:result});
    
    router.put('/:cid/product/:pid', putProductToCart )
    // let cid = req.params.cid;
    // let pid = req.params.pid;
    // let {quantity} = req.body;
    
    // let cart = await cartsManager.getOne(cid);
    // let productExist = false;
    // cart.products.forEach(product => {
    //     if (product._id == pid) {
    //         product.quantity = quantity;
    //         productExist = true
    //     }
    // })
    // if (productExist === true) {
    //     let result = await cartsManager.updateCart(cid, cart);
    //     res.send({status: "Success", payload: result});
    // } else {
    //     res.send({status: 404, payload: "El producto no existe en el carrito"});
    // }

router.delete('/:cid', deleteP)
// const cid = req.params.cid;
// let cart = await cartsManager.getOne(cid);
// cart.products = [];
// let result = await cartsManager.updateCart(cid,cart);
// res.send({status: "Success", payload: result});

router.post("/:cid/purchase", passportCall("jwt"), purchasee);

export default router;


