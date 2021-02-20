import { Request, Response } from "express";
import { Combo } from '../models/combo';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "Combos";

export async function createCombo(req: Request, res: Response) {           
    try{                 
        const newCombo = Combo(req.body, undefined);
        const ComboAdded = await db.collection(collection).add(newCombo);                            
        return res.status(201).json(Message('Combo agregada', `Combo fue agregada con el id ${ComboAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveCombo(req: Request, res: Response) {           

    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Combo no encontrada', `Combo con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Combo(doc.data(), doc.id));
    }
    catch(err){
        return handleError(res, err);
    }    
}

export async function updateCombo(req: Request, res: Response) {       
    try {
        const ComboToUpdate = Combo(req.body);
        await db.collection(collection).doc(req.params.id).set(ComboToUpdate, {merge : true});
        return res.status(200).json(Message('Combo actualizada', `Combo con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteCombo(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Combo eliminada', `Combo con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listCombo(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('fusion').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Combo(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countCombo(req: Request, res: Response) {       
    try {
        let snapshot = await db.collection(collection).get();        
        return res.status(200).json({ numberDocs : snapshot.size });        
    } catch (err) {
        return handleError(res, err);
    }
}

/*export async function ComboCombo(req: Request, res: Response){
    try {

        let snapshot = await db.collection(collection).where('disponibility','==','Disponible').get();
        return res.status(200).json(snapshot.docs.map(doc => Combo(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }
}*/
//-----------------------------------------------------------------------------------------------
function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}