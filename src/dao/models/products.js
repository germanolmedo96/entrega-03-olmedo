import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
	code: {
		type: String,
		required:true
	},
	title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        default:"Sin imagen"
    },
	status: {
		type: Boolean,
		default: true
	}
});
productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(productCollection, productSchema);
export default productsModel;
