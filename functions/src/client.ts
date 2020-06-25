import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const collection = "customers";
const routes = Router();
const db = main.db;

interface Client {
    name? : string
    direction? : string
    identy? : string
    active? : string
    phone? : string
}

routes.post('/customers', async (req, res) => {           
    try{
        const newClient: Client = {
            name: req.body['name'],
            direction: req.body['direction'],
            identy: req.body['identy'],
            active: req.body['active'],
            phone: req.body['phone'],
        }
        const ClientAdded = await firebaseHelper.firestore
            .createNewDocument(db, collection, newClient);
        res.status(201).send(`Client was added to collection with id ${ClientAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/customers/:id', (req,res)=>{    
    firebaseHelper.firestore.getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

routes.patch('/customers/:id', async(req, res) => {
    try{    
        const Client : Client = {
            name: req.body['name'],
            direction: req.body['direction'],
            identy: req.body['identy'],
            active: req.body['active'],
            phone: req.body['phone'],
        }
        const docUpdated = await firebaseHelper.firestore
            .updateDocument(db, collection, req.params.id, Client);
        res.status(200).send(`Client with id ${docUpdated.id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/customers/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).send(`Client was deleted ${id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/customers', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

export { routes };