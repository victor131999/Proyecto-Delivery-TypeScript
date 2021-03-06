import { Request, Response } from "express";
import { Charge } from '../models/charge';
import { db } from "../index";
import { Message } from "../models/message";
import { Motorized} from "../models/motorized";
import { Customer } from "../models/customer";
import { Local } from "../models/local";

const collection = "charges";

export async function createCharge(req:Request, res: Response){         
    try{     
        const { email } = res.locals;        
        const newcharge = Charge(req.body, undefined, email);

        const motorized = await db.collection('motorizeds').doc(req.body['idmotorized']).get();
        newcharge.motorized = Motorized(motorized.data());

        const customer = await db.collection('customers').doc(req.body['idcustomer']).get();
        newcharge.customer = Customer(customer.data());

        const local = await db.collection('locals').doc(req.body['idlocal']).get();
        newcharge.local = Local(local.data());

        console.log('creando nueva charge');
   
        const id = (await db.collection(collection).add(newcharge)).id
        return res.status(201).json(Message('charge added', `charge with id: ${id} has been added`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function retrieveCharge(req: Request, res: Response) {           

    try{
        const doc = await db.collection(collection).doc(req.params.id).get();        
        if(!doc) {
            return res.status(404).json(Message('charge no encontrada', `chargeo con el id ${req.params.id} no encontrada`, 'warning'));               
        }        
        return res.status(200).json(Charge(doc.data(), doc.id));
    }
    catch(err){
        return handleError(res, err);
    }    
}

export async function updateCharge(req: Request, res: Response) {       
    try {
        const chargeToUpdate = Charge(req.body);
        await db.collection(collection).doc(req.params.id).set(chargeToUpdate, {merge : true});
        return res.status(200).json(Message('charge actualizada', `chargeo con el id ${req.params.id} fue actualizada`, 'success'));        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function deleteCharge(req: Request, res: Response) {       
    try{
        await db.collection(collection).doc(req.params.id).delete();
        return res.status(200).json(Message('charge eliminada', `chargeo con el id ${req.params.id} fue eliminada correctamente`, 'success')
        );
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listCharge(req: Request, res: Response) {       
    try {
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('state').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Charge(doc.data(), doc.id)));        
    } catch (err) {
        return handleError(res, err);
    }       
};

export async function countCharge(req: Request, res: Response) {       
    try {
        let snapshot = await db.collection(collection).get();        
        return res.status(200).json({ numberDocs : snapshot.size });        
    } catch (err) {
        return handleError(res, err);
    }
}

export async function listCustomerCharge(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idcustomer','==', id).get();   
        return res.status(200).json(snapshot.docs.map(doc=>Charge(doc.data(), doc.id)));
    }catch(err){
        return handleError(res, err);
    }
}
//Graficas
//--------------------------------Contador de ordenes por clientes potenciales-----------------------------------
export async function countChargesCustomer1(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idcustomer','==', id).get();   
        return res.status(200).json({ numberDocs1 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}

export async function countChargesCustomer2(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idcustomer','==', id).get();   
        return res.status(200).json({ numberDocs2 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}

export async function countChargesCustomer3(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idcustomer','==', id).get();   
        return res.status(200).json({ numberDocs3 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}

export async function countChargesCustomer4(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idcustomer','==', id).get();   
        return res.status(200).json({ numberDocs4 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}

export async function countChargesCustomer5(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idcustomer','==', id).get();   
        return res.status(200).json({ numberDocs5 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}

//------------------------------Contador de ordenes que pertenecen a locales-----------------
export async function countChargesLocal1(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idlocal','==', id).get();   
        return res.status(200).json({ numberDocsLocal1 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}
export async function countChargesLocal2(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idlocal','==', id).get();   
        return res.status(200).json({ numberDocsLocal2 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}
export async function countChargesLocal3(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idlocal','==', id).get();   
        return res.status(200).json({ numberDocsLocal3 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}
export async function countChargesLocal4(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idlocal','==', id).get();   
        return res.status(200).json({ numberDocsLocal4 : snapshot.size }); 
    }catch(err){
        return handleError(res, err);
    }
}

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}