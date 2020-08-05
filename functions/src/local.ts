import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Local, Message } from './models';

const collection = "locals";
const routes = Router();
const db = main.db;

routes.post('/locals', async (req, res) => {           
    try{
        const newLocal: Local = {
            name: req.body['name'],
            direction: req.body['direction']
        }
        const LocalAdded = await firebaseHelper.firestore
            .createNewDocument(db, collection, newLocal);
            res.status(201).json(Message('Local agregado',`El local se agrego a la coleccion con el id ${LocalAdded.id}`,'success'));
        }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.put('/locals/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const local : Local = {
            name: req.body['name'],
            direction: req.body['direction']
        }; 
        await db.collection(collection).doc(id).update(local);
        res.status(200).json(
            Message('local actualizado', `Cliente con el id ${id} fue actualizada correctamente`, 'success')
        );
    }
    catch(err){
        res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));
    }
});

routes.get('/locals/:id', (req,res)=>{    
    firebaseHelper.firestore.getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(Local(doc.id,doc)))
        .catch(err => res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error')));
});

routes.patch('/locals/:id', async(req, res) => {
    try{    
        const Local : Local = {
            name: req.body['name'],
            direction: req.body['direction']
        }
        const docUpdated = await firebaseHelper.firestore
            .updateDocument(db, collection, req.params.id, Local);
        res.status(200).json(Message('Local actualizado',`El local  con el id ${docUpdated.id} se actualizo`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.delete('/locals/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).json(Message('Local eliminado',`El local  con el id ${id} se elimino`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.get('/locals', (req, res) =>{ 
    db.collection(collection).orderBy('name')
    .get()
        .then(snapshot => {           
            res.status(200).json(snapshot.docs.map(doc => Local(doc.id, doc.data())));
        }).catch(err => res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error')));
        
    });

routes.get('/locals/:page/:limit', (req, res) => {        
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    db.collection(collection).orderBy('name').offset(avoid).limit(limit).get()        
        .then(snapshot => res.status(200).json(snapshot.docs.map(doc => Local(doc.id,doc.data()))))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`)); 
});

routes.get('/count/locals', (req, res) => {            
    db.collection(collection)        
        .get()
        .then(snapshot => {
            let size = snapshot.size;
            res.status(200).json( { numberDocs : size } )
        })            
        .catch(err => res.status(400).send(`An error has ocurred ${err}`)); 
});
export { routes };