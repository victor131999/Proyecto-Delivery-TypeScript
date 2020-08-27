import { Request, Response } from "express";
import { Customer } from '../models/customer';
import { db } from "../index";
import { Message } from "../models/message";

const collection = "customers";



export async function createCustomer(req: Request, res: Response) {           
    try{            
        const newcustomer = Customer(req.body);
        const customerAdded = await db.collection(collection).add(newcustomer);                            
        return res.status(201).json(Message('Cliente agregada', `Cliente fue agregada con el id ${customerAdded.id}`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
}

export async function retrieveCustomer(req: Request, res: Response) {           

    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('Cliente no encontrada', `Cliente con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Customer(doc.data(), doc.id));
    }
    catch(err){
        return handleError(res, err);
    }    
}

export async function updateCustomer(req: Request, res: Response) {       
    try {
        const customerToUpdate = Customer(req.body);
        await db.collection(collection).doc(req.params.id).set(customerToUpdate, {merge : true});
        return res.status(200).json(Message('Cliente actualizada', `Cliente con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteCustomer(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('Cliente eliminada', `Cliente con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listCustomer(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('name').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Customer(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countCustomer(req: Request, res: Response) {       
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