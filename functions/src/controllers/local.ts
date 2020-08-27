import { Request, Response } from "express";
import { Local } from '../models/local';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "locals";

export async function createLocal(req: Request, res: Response) {           
    try{            
        const newlocal = Local(req.body);
        const localAdded = await db.collection(collection).add(newlocal);                            
        return res.status(201).json(Message('Local agregada', `Local fue agregada con el id ${localAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveLocal(req: Request, res: Response) {           

    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Local no encontrada', `Local con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Local(doc, doc.id));
    }
    catch(err){
        return handleError(res, err);
    }    
}

export async function updateLocal(req: Request, res: Response) {       
    try {
        const localToUpdate = Local(req.body);
        await db.collection(collection).doc(req.params.id).set(localToUpdate, {merge : true});
        return res.status(200).json(Message('Local actualizada', `Local con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteLocal(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Local eliminada', `Local con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listLocal(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('name').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Local(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countLocal(req: Request, res: Response) {       
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