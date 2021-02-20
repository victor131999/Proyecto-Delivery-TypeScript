/** Controlador :  atender la petición cliente que viene en una url de Router, 
 * interactua con los modelos y los servicios(BDD) y retorna una respuesta**/

import { Request, Response } from "express";
import { Reservation } from '../models/reservation';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "Reservations";

export async function createReservation(req: Request, res: Response) {           
    try{
        const newReport = Reservation(req.body);                        
        console.log(newReport);
        const reservationAdded = await db.collection(collection).add(newReport);                            
        return res.status(201).json(Message('Reservación agregado', `La reservacion fue agregado con el id ${reservationAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}