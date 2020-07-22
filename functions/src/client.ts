import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Client, Message} from './models';

const collection = "customers";
const routes = Router();
const db = main.db;


routes.post('/customers', async (req, res) => {           
    try{
        const newClient = Client(req.body);
        const ClientAdded = await firebaseHelper.firestore
            .createNewDocument(db, collection, newClient);
        res.status(201).json(Message('Cliente agregado',`El cliente se agrego a la coleccion con el id ${ClientAdded.id}`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));

    }
});

routes.get('/customers/:id', (req,res)=>{    
    firebaseHelper.firestore.getDocument(db, collection, req.params.id)
    .then(doc => {
        let clientQuery =Client(doc,doc.id);
        console.log(clientQuery);
        res.status(200).json(clientQuery);
    })        
    .catch(err => res.status(400).json({message: `An error has ocurred ${err}`}));
});



routes.put('/customers/:id', (req, res) => {        
    var id = req.params.id;
    const client = Client(req.body, id);
    console.log("Actualizando cliente");
    console.log(client);
    console.log(id);
    firebaseHelper.firestore.updateDocument(db, collection, id, client).then(
        result => {
            res.status(200).json(
                Message('cliente actualizado', `cliente con el id ${id} fue actualizado correctamente`, 'success')
            )
        }).catch(err => {
    res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));
});
});

routes.delete('/customers/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).json(Message('Cliente eliminado',`El cliente con el id ${id} se elimino`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.get('/customers', (req, res) =>{     
    db.collection(collection).orderBy('name').get()
    .then(snapshot =>{
        res.status(200).json(snapshot.docs.map(doc =>Client(doc.data(),doc.id)))
    }).catch(err => res.status(400).send(`Un error ha ocurrido ${err}`));
});

export { routes };