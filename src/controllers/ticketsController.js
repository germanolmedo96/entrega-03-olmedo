import Ticket from "../dao/dbManagers/tickets.js";
import User from "../dao/dbManagers/users.js";

const ticketService = new Ticket();
const userService = new User();



export const getTickets = async (req,res) => {
    let result = await ticketService.getAll();
    res.send({status:"success",result:result})
}

export const createTicket = async (req,res) => {
    const {user,cart} = req.body; 
    //Generamos codigo unico
    let code = await ticketService.createCode();
    //Fecha actual de generacion de ticket
    let purchase_datetime = new Date();
    //Usuario que genero el ticket
    let resultUser = await userService.getById(user);
    //Monto total a pagar del carrito
    



    res.send({status:"success",result:result})
}



export const getTicketbyid = async (req,res) => {
    res.send({status:"success",result:result})
}


export const resolveTicket = async (req,res) => {
    res.send({status:"success",result:result})
}

export default{
    getTickets,
    createTicket,
    getTicketbyid,
    resolveTicket
}