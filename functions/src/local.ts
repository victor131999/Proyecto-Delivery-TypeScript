import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Local, Message } from './models';

const collection = "locals";
const routes = Router();
const db = main.db;

routes.post('/locals', async (req, res) => {           
    try{            
        const newLocal = Local(req.body);
        const localAdded = await firebaseHelper.firestore
        .createNewDocument(db, collection, newLocal);
        res.status(201).json(
            Message('Local agregado', `Local fue agregado con el id ${localAdded.id}`, 'success')
        );
    }
    catch(err){
        res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));
    }
});

routes.put('/locals/:id', (req, res) => {        
    var id = req.params.id;
    const local = Local(req.body, id);        
    firebaseHelper.firestore.updateDocument(db, collection, id, local).then(
        result => {
            res.status(200).json(
                Message('Local actualizado', `Local con el id ${id} fue actualizada correctamente`, 'success')
            )
        }).catch(err => {
    res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));
});
});

routes.get('/locals/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => {
                let localQuery = Local(doc, doc.id);
                console.log(localQuery);
                res.status(200).json(localQuery);
            })
        .catch(err => res.status(400).json({message: `An error has ocurred ${err}`}));    
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

routes.get('/locals/:page/:limit', (req, res) => {        
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    db.collection(collection).orderBy('name').offset(avoid).limit(limit).get()        
        .then(snapshot => res.status(200).json(snapshot.docs.map(doc => Local(doc.data(),doc.id))))
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