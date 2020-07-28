import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Customer, Message} from './models';

const collection = "customers";
const routes = Router();
const db = main.db;


routes.post('/customers', async (req, res) => {           
    try{            
        const newCustomer : Customer = {
            name: req.body['name'],
            direction: req.body['direction'],
            identy: req.body['identy'],
            active: req.body['active'],
            phone: req.body['phone']            
        };      
        const ClientAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newCustomer);
        res.status(201).json(Message('Cliente agregado', 
            `El cliente se agregó a la colección con el id ${ClientAdded.id}`, 
            'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido', `${err}`, 'error'))
    }
});

routes.get('/customers/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(Customer(doc.id,doc)))
        .catch(err => res.status(400).json(Message('Un error ha ocurrido', `${err}`, 'error')));
});


routes.patch('/customers/:id', async(req, res) => {
    try{       
        let id = req.params.id;
        const Customer : Customer = {
            name: req.body['name'],
            direction: req.body['direction'],
            identy: req.body['identy'],
            active: req.body['active'],
            phone: req.body['phone']   
        }; 
        await firebaseHelper.firestore.updateDocument(db, collection, id, Customer);
        res.status(200).json(Message('Cliente actualizado'
            , `El cliente con el id ${id} fue actualizada`
            , 'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido', `${err}`, 'error'))
    }
});


routes.delete('/customers/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        res.status(200).json(Message('Cliente eliminado',`El cliente con el id ${id} se elimino`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.get('/customers', (req, res) =>{     
    db.collection(collection).get()
    .then(snapshot =>{
        res.status(200).json(snapshot.docs.map(doc =>Customer(doc.id,doc.data())))
    })
    .catch(err => res.status(400).send(`Un error ha ocurrido ${err}`));
});

export { routes };