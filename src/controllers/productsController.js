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

    // try{
    //     const { title,description,code,price,status,stock,category,thumbnails,id } = req.body;    

    //     if(!title || !description || !code || !price || !stock || !category){
    //         return res.status(400).send({status: 'error', message:'Valores incompletos'});
    //     } 

    //     const product = {
    //         title,
    //         description,
    //         code,
    //         price,
    //         stock, 
    //         category,
    //         thumbnails,
    //     };
        
    //     const result = await productsService.saveProduct(product);

    //     res.send({ result: 'success', result});
    // }catch(error){
    //     res.status(500).send({error});
    // }

    const product = req.body;
	try {
		const result = await addOneService(product);
		res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error });
    }


    // const { title,description,code,price,status,stock,category,thumbnails,id } = req.body;
	// try {
	// 	const result = await addOneService(product);
	// 	res.send({ status: 'success', payload: result });
    // } catch (error) {
    //     res.status(error.httpStatusCode || 500).send({ error: error.message });
    // }

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