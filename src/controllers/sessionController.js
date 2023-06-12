import passport from 'passport';
import config from '../config/config.js'
import userModel from "../dao/models/user.js";
import * as UserService from "../services/user.service.js"
import {Aregister } from '../services/session.services.js';

export const  postRegister = async(req,res)=>{
    try{
        const { first_name, last_name, email, age, password, rol } = req.body;

        if(!first_name || !last_name || !email || !age || !password || !rol ){
            return res.sendClientError('incomplete values');
        }

        const user = { first_name, last_name, email, age, password, rol };
        
        const result = await Aregister(user);

        if(result==='exist'){
            return res.sendClientError('User already exists');
        }
        res.sendSuccess(result); 
        req.logger.info(`Solicitud procesada: ${req.method} ${req.url}`);
        
    } catch(error){
        req.logger.error(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
        res.sendServerError(error);
    }
}

export const failLogin = async(req,res)=>{
    res.send({ status: 'error', message: 'login failed' });
}

export const getCurrentUser = async(req,res)=>{
    try {
        res.send(req.session.user);
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
};

const logout = async(req, res) => {
    try {
        req.session.destroy(error => {
            if (error) throw new err(`${error}`, 500);
            res.redirect('/products')
        });
    } catch (error) {
        res.status(error.httpStatusCode || 500).send({ error: error.message });
    }
}

export const postLogin = async(req,res)=>
{
    const { email, password } = req.body;

    if (email == config.adminEmail && password == config.adminPassword) {
        req.session.user = {
            id: "adminCoder",
            first_name: "Coder",
            last_name: "Admin",
            email: email,
            rol: "admin",
        };
        return res.send({ status: "success", message: "logueado" });
    }

    // if (!req.user) return res.status(400).send({ status: "error", error: "Contraseña invalida" });

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol
    }

    res.send({ status: "success", payload: req.user });
}



export const failRegister = async(req,res)=>{
    res.send({ status: 'error', message: 'Register failed' });
}

export const getLogout = async(req,res)=>{
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: 'error', error: 'couldnt logout' });
        res.redirect('/products');
    })
}

export const getGitHub = async(req,res)=>{
        res.send({ status: 'succes', message:'user Registered'});
}

export const getGitHubCallback= async(req,res)=>{
    try {
        const accessToken = await UserService.githubCallback(req.user);
    
        res
          .cookie("coderCookieToken", accessToken, {
            maxAge: 60 * 60 * 24 * 7,
            httpOnly: true,
          })
          .redirect("/products");
      } catch (error) {
        logger.error(error);
        res.status(500).send(error);
      }
}
export default{
    postRegister,
    failLogin,
    postLogin,
    failRegister,
    getLogout,
    getGitHub,
    getGitHubCallback
}