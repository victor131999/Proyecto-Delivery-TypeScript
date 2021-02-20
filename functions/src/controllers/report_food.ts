/** Controlador :  atender la petición cliente que viene en una url de Router, 
 * interactua con los modelos y los servicios(BDD) y retorna una respuesta**/

import { Request, Response } from "express";
import { Report } from '../models/report_food';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "Reports";

export async function createReport(req: Request, res: Response) {           
    try{
        const newReport = Report(req.body);                        
        console.log(newReport);
        const reportAdded = await db.collection(collection).add(newReport);                            
        return res.status(201).json(Message('Reporte agregado', `El reporte fue agregado con el id ${reportAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}