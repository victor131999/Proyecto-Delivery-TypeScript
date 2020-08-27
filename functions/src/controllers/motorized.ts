import { Request, Response } from "express";
import { Motorized } from '../models/motorized';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "motorizeds";

export async function createMotorized(req: Request, res: Response) {           
    try{            
        const newMotorized = Motorized(req.body);
        const motorizedAdded = await db.collection(collection).add(newMotorized);                            
        return res.status(201).json(Message('Motorizado agregada', `Motorizado fue agregada con el id ${motorizedAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveMotorized(req: Request, res: Response) {           

    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Motorizado no encontrada', `Motorizado con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Motorized(doc.data(), doc.id));
    }
    catch(err){
        return handleError(res, err);
    }    
}

export async function updateMotorized(req: Request, res: Response) {       
    try {
        const motorizedToUpdate = Motorized(req.body);
        await db.collection(collection).doc(req.params.id).set(motorizedToUpdate, {merge : true});
        return res.status(200).json(Message('Motorizado actualizada', `Motorizado con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteMotorized(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Motorizado eliminada', `Motorizado con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listMotorized(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('name').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Motorized(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countMotorized(req: Request, res: Response) {       
    try {
        let snapshot = await db.collection(collection).get();        
        return res.status(200).json({ numberDocs : snapshot.size });        
    } catch (err) {
        return handleError(res, err);
    }
}


function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}