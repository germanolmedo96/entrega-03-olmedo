import { Router } from "express";
import {getTickets,getTicketbyid, createTicket, resolveTicket} from '../controllers/ticketsController.js'
const router = Router();

router.get('/',getTickets);
router.post('/',createTicket)

router.get('/:oid',getTicketbyid)
router.put('/:oid',resolveTicket)

export default router;