import { USERDAO } from "../dao/index.js";
import { compareHashedData, generateToken, hashData } from '../utils.js';
import userModel from "../dao/models/user.js";
import Users from "../dao/dbManager/users.js";
const createUserRepository = async(newUser) => await USERDAO.create(newUser);
const existsUserRepository = async(username) => await USERDAO.exists(username);
const getUserRepository = async(username) => await USERDAO.get(username);
const findUserByIdRepository = async(id) => await USERDAO.findById(id);
const update = async (email, user) => await USERDAO.update(email, user);

 const register = async (user) => {
    const userDB = await Users.update(user.email);

    if(userDB) {
        const result ='exist';
        return result;
    }; 
    
    const hashPassword = await hashData(user.password);
    user.password = hashPassword; 
    user.rol = user.rol.toUpperCase();

    const newUserDB = await Users.saveUser(user); 
    return newUserDB;
}

const login = async (email, password) => {
    const user= await Users.get(email);
    if(!user) {
        const result = 'notCredentials';
        return result;
     }
    
    const comparePassword = await compareHashedData(password, user.password);
    if(!comparePassword) {
        const result = 'notCredentials';
        return result;
     } 
    
    const userDto = new userModel(user)
    const userLog = {...userDto}
    const accessToken = generateToken(userLog);
    return accessToken; 
};

export {
    createUserRepository,
    existsUserRepository,
    getUserRepository,
    findUserByIdRepository,
    login,
    update,
    register
}