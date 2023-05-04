import Products from "../dao/dbManager/products.js";
import productsModel from "../dao/models/products.js";
import { getAllService, getByIdService, addOneService, updateOneByIdService, deleteOneByIdService } from "../services/products.service.js";

const productsManager = new Products();



export const getProducts = async(req,res)=>{
    let products = await productsManager.getAll();
    console.log(products);
    res.send({status:"success" , payload:products})
}

export const postProducts = async(req,res)=>{

    const product = req.body;
	try {
		const result = await addOneService(product);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }

    // const {title,description,price,code,quantity,category,thumbnail} = req.body;

    // let newProduct = {
    //     title,
    //     description,
    //     price,
    //     code,
    //     quantity,
    //     category,
    //     thumbnail
    // };

    // const result = await productsManager.saveProduct(newProduct);
    // res.send({status:"success" , payload:result});
}

export const putProduct = async(req,res)=>{
    const pid = req.params.pid;
	const product = req.body;
	try {
		const result = await updateOneByIdService(pid, product);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }

    // let id = req.params.pid;
    // const {title,description,price,code,quantity,category,thumbnail} = req.body;
    // let updateProduct = {
    //     title,
    //     description,
    //     price,
    //     code,
    //     quantity,
    //     category,
    //     thumbnail
    // };
    // let result = await productsManager.updateProduct(id,updateProduct)
    // res.send({status:"success" , payload:result})
}

export const deleteProduct = async(req,res)=>{
    const id = req.params.pid;
	try {
		const result = await deleteOneByIdService(id);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }

    // let id = req.params.pid;
    // let result = await productsManager.deleteProduct(id);
    // res.send({status:"success" , payload:result})
}

export default {
    getProducts,
    postProducts,
    putProduct,
    deleteProduct
}