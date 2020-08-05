import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Motorized,Message } from './models';

const collection = "motorizeds";
const routes = Router();
const db = main.db;


routes.post('/motorizeds', async (req, res) => {           
    try{
        const newMotorized: Motorized = {
            name: req.body['name'],
            vehicle: req.body['vehicle']
        }
        const MotorizedAdded = await firebaseHelper.firestore
            .createNewDocument(db, collection, newMotorized);
        res.status(201).json(Message('Vehiculo agregado',`El vehiculo se agrego a la coleccion con el id ${MotorizedAdded.id}`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.put('/motorizeds/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const motorized : Motorized = {
            name: req.body['name'],
            vehicle: req.body['vehicle']
        }; 
        await db.collection(collection).doc(id).update(motorized);
        res.status(200).json(
            Message('Vehiculo actualizado', `El vehiculo con el id ${id} fue actualizada correctamente`, 'success')
        );
    }
    catch(err){
        res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));
    }
});

routes.get('/motorizeds/:id', (req,res)=>{    
    firebaseHelper.firestore.getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(Motorized(doc.id,doc)))
        .catch(err => res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error')));
});

routes.patch('/motorizeds/:id', async(req, res) => {
    try{    
        const Motorized : Motorized = {
            name: req.body['name'],
            vehicle: req.body['vehicle']
        }
        const docUpdated = await firebaseHelper.firestore
            .updateDocument(db, collection, req.params.id, Motorized);
        res.status(200).json(Message('Vehiculo actualizado',`El vehiculo  con el id ${docUpdated.id} se actualizo`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.delete('/motorizeds/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).json(Message('Vehiculo eliminado',`El vehiculo  con el id ${id} se elimino`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.get('/motorizeds', (req, res) =>{     
    db.collection(collection).get()
        .then(snapshot => {           
            res.status(200).json(snapshot.docs.map(doc => Motorized(doc.id, doc.data())));
        }).catch(err => res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error')));
});

routes.get('/motorizeds/:page/:limit', (req, res) => {        
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    db.collection(collection).orderBy('name').offset(avoid).limit(limit).get()        
        .then(snapshot => res.status(200).json(snapshot.docs.map(doc => Motorized(doc.id,doc.data()))))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`)); 
});

routes.get('/count/motorizeds', (req, res) => {            
    db.collection(collection)        
        .get()
        .then(snapshot => {
            let size = snapshot.size;
            res.status(200).json( { numberDocs : size } )
        })            
        .catch(err => res.status(400).send(`An error has ocurred ${err}`)); 
});
export { routes };