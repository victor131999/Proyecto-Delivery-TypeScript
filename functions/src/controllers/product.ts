import { Request, Response } from "express";
import { Product } from '../models/product';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "products";

export async function createProduct(req: Request, res: Response) {           
    try{            
        const newproduct = Product(req.body);
        const productAdded = await db.collection(collection).add(newproduct);                            
        return res.status(201).json(Message('Producto agregada', `Producto fue agregada con el id ${productAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveProduct(req: Request, res: Response) {           

    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Producto no encontrada', `Producto con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Product(doc.data(), doc.id));
    }
    catch(err){
        return handleError(res, err);
    }    
}

export async function updateProduct(req: Request, res: Response) {       
    try {
        const productToUpdate = Product(req.body);
        await db.collection(collection).doc(req.params.id).set(productToUpdate, {merge : true});
        return res.status(200).json(Message('Producto actualizada', `Producto con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteProduct(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Producto eliminada', `Producto con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listProduct(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('name').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Product(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countProduct(req: Request, res: Response) {       
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