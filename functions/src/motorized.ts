import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const collection = "motorizeds";
const routes = Router();
const db = main.db;

interface Motorized {
    name? : string
    vehicle? : string
}

routes.post('/motorizeds', async (req, res) => {           
    try{
        const newMotorized: Motorized = {
            name: req.body['name'],
            vehicle: req.body['vehicle']
        }
        const MotorizedAdded = await firebaseHelper.firestore
            .createNewDocument(db, collection, newMotorized);
        res.status(201).send(`Motorized was added to collection with id ${MotorizedAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/motorizeds/:id', (req,res)=>{    
    firebaseHelper.firestore.getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

routes.patch('/motorizeds/:id', async(req, res) => {
    try{    
        const Motorized : Motorized = {
            name: req.body['name'],
            vehicle: req.body['vehicle']
        }
        const docUpdated = await firebaseHelper.firestore
            .updateDocument(db, collection, req.params.id, Motorized);
        res.status(200).send(`Motorized with id ${docUpdated.id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/motorizeds/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).send(`Motorized was deleted ${id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/motorizeds', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

export { routes };