import userModel from "../models/user.js";

export default class Users {
	constructor() {};

	exists = async (email) => {
        return await userModel.findOne({ email }) ? true : false;
    };

	get = async (email) => {
        return await userModel.findOne({ email });
    };

	findById = async (id) => {
        return await userModel.findById(id);
    };

    update = async (email, user) => {
        return await userModel.updateOne({ email }, user);
    }

    saveUser = async (user) => {
        let result = await userModel.create(user);
        req.logger.info('Actualización de base de datos USER realizada');
        return result;
    }
    create = async (user) => {
        if(user.email.startsWith('admin')) user['role'] = 'admin';
        const result = await userModel.create(user);
        return result;
    };
}