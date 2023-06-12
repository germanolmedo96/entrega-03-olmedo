import { createUserRepository, existsUserRepository, findUserByIdRepository, getUserRepository, update } from "../repository/sessions.repository.js";
import {login, register} from '../repository/sessions.repository.js';


const createUserService = async(newUser) => await createUserRepository(newUser);
const existsUserService = async(username) => await existsUserRepository(username);
const getUserService = async(username) => await getUserRepository(username);
const findUserByIdService = async(id) => await findUserByIdRepository(id);
const updateSess = async()=> await update()
const clogin = async (email, password) => {
    const result = await login(email, password);
    return result;
};
 export const Aregister = async (user) => {
    const result = await register(user);
    return result;
}

export {
    createUserService,
    existsUserService,
    getUserService,
    findUserByIdService,
    clogin,
    updateSess,
    // register
}