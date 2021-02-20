import { Request, Response } from "express";
import { Drink } from '../models/Drink';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "Drinks";

export async function createDrink(req: Request, res: Response) {           
    try{                 
        const newDrink = Drink(req.body, undefined);
        const DrinkAdded = await db.collection(collection).add(newDrink);                            
        return res.status(201).json(Message('Bebida agregada', `Bebida fue agregada con el id ${DrinkAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveDrink(req: Request, res: Response) {           

    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Bebida no encontrada', `Bebida con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Drink(doc.data(), doc.id));
    }
    catch(err){
        return handleError(res, err);
    }    
}

export async function updateDrink(req: Request, res: Response) {       
    try {
        const DrinkToUpdate = Drink(req.body);
        await db.collection(collection).doc(req.params.id).set(DrinkToUpdate, {merge : true});
        return res.status(200).json(Message('Bebida actualizada', `Bebida con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteDrink(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Bebida eliminada', `Bebida con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listDrink(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('name').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Drink(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countDrink(req: Request, res: Response) {       
    try {
        let snapshot = await db.collection(collection).get();        
        return res.status(200).json({ numberDocs : snapshot.size });        
    } catch (err) {
        return handleError(res, err);
    }
}

/*export async function ComboDrink(req: Request, res: Response){
    try {

        let snapshot = await db.collection(collection).where('disponibility','==','Disponible').get();
        return res.status(200).json(snapshot.docs.map(doc => Drink(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }
}*/
//-----------------------------------------------------------------------------------------------
function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}