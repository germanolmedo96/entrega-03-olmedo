import userModel from '../dao/models/user.js';
import {login} from "../repository/sessions.repository.js";
import {createCartRepository} from "../repository/carts.repository.js";
import {updateSess} from '../services/session.services.js'


class UserService {
    
    getAll = async () => {
        let users = await userModel.find();
        return users.map(user=>user.toObject());
    };
    saveUser = async (user) => {
        let result = await userModel.create(user);
        return result;
    };
    getUserByUsername = async (username) => {
        const result = await userModel.findOne({username});
        return result;
    };
    getUserById = async (id) => {
        const result = await userModel.findOne({_id: id});
        return result;  
    }
    updateUser = async (filter, value) => {
        let result = await userModel.updateOne(filter, value);
        return result;
    }
    githubCallback = async (user) => {
        user = await login(user);
        if (!user.cart) {
          const cart = await createCartRepository();
          user.cart = cart._id.toString();
          await updateSess(user.email, user);
        }
      
        return generateToken(user);
      };
    delete = async (username) => {
        if(username) {
            let result = await userModel.deleteOne({username: username});
            if(result.deletedCount > 0) {
                return true;
            }
            else {
                let cart = await this.getUserByUsername(username)
                if(cart) {
                    throw Error("No se pudo borrar el carrito.")
                }
                else {
                    throw {
                        code: 404,
                        detail: "No se encontró el carrito!"
                    } 
                }
            }
        }
    }
};
export default UserService;