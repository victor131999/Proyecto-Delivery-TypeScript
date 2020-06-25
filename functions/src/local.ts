import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const collection = "locals";
const routes = Router();
const db = main.db;

interface Local {
    name? : string
    direction? : string
}

routes.post('/locals', async (req, res) => {           
    try{
        const newLocal: Local = {
            name: req.body['name'],
            direction: req.body['direction']
        }
        const LocalAdded = await firebaseHelper.firestore
            .createNewDocument(db, collection, newLocal);
        res.status(201).send(`Local was added to collection with id ${LocalAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/locals/:id', (req,res)=>{    
    firebaseHelper.firestore.getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

routes.patch('/locals/:id', async(req, res) => {
    try{    
        const Local : Local = {
            name: req.body['name'],
            direction: req.body['direction']
        }
        const docUpdated = await firebaseHelper.firestore
            .updateDocument(db, collection, req.params.id, Local);
        res.status(200).send(`Local with id ${docUpdated.id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/locals/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).send(`Local was deleted ${id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/locals', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

export { routes };