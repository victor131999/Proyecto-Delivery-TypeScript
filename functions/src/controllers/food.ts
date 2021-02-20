import { Request, Response } from "express";
import { Food } from '../models/food';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "Foods";

export async function createFood(req: Request, res: Response) {           
    try{                 
        const newFood = Food(req.body, undefined);
        const FoodAdded = await db.collection(collection).add(newFood);                            
        return res.status(201).json(Message('Menú agregada', `Menú fue agregada con el id ${FoodAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveFood(req: Request, res: Response) {           

    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Menú no encontrada', `Menú con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Food(doc.data(), doc.id));
    }
    catch(err){
        return handleError(res, err);
    }    
}

export async function updateFood(req: Request, res: Response) {       
    try {
        const FoodToUpdate = Food(req.body);
        await db.collection(collection).doc(req.params.id).set(FoodToUpdate, {merge : true});
        return res.status(200).json(Message('Menú actualizada', `Menú con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteFood(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Menú eliminada', `Menú con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listFood(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('like','desc').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Food(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countFood(req: Request, res: Response) {       
    try {
        let snapshot = await db.collection(collection).get();        
        return res.status(200).json({ numberDocs : snapshot.size });        
    } catch (err) {
        return handleError(res, err);
    }
}

/*export async function ComboFood(req: Request, res: Response){
    try {

        let snapshot = await db.collection(collection).where('disponibility','==','Disponible').get();
        return res.status(200).json(snapshot.docs.map(doc => Food(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }
}*/
//-----------------------------------------------------------------------------------------------
function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}