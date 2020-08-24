import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Order, Message } from './models';

const collection = "orders";
const routes = Router();
const db = main.db;


 function getsubtotal(typeiva: string, aumont:number) {
    if(typeiva === "N"){
        return aumont;
    }else if(typeiva === "P"){
        return  1.12 *aumont;
    }
    return aumont;
}


routes.post('/orders', async (req, res) => {           
    try{            
        const newOrder : Order = {
            typeiva: req.body['typeiva'],
            aumont: req.body['aumont'],
            state: req.body['state'],
            subtotal: getsubtotal(req.body['typeiva'],req.body['aumont'])             
        };      
        const SubjectAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newOrder);
        res.status(201).json(Message('Orden agregada', 
            `La orden se agregó a la colección con el id ${SubjectAdded.id}`, 
            'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido', `${err}`, 'error'))
    }
});

routes.get('/orders', (req, res) =>{     
    db.collection(collection).get()
    .then(snapshot => {
        res.status(200).json(snapshot.docs.map(doc => Order(doc.data(),doc.id)))
    })
    .catch(err => res.status(400).json(Message('Un error ha ocurrido', `${err}`, 'error')));
});


routes.patch('/orders/:id', async(req, res) => {
    try{    
        let id = req.params.id;
        const Order : Order = {
            typeiva: req.body['typeiva'],
            aumont: req.body['aumont'],
            state: req.body['state'],
            subtotal: getsubtotal(req.body['typeiva'],req.body['aumont'])               
        }
       await firebaseHelper.firestore
            .updateDocument(db, collection, id, Order);
            res.status(200).json(Message('Orden actualizada'
            , `La orden con el id ${id} fue actualizada`
            , 'success'));    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido', `${err}`, 'error'))    }
});

routes.put('/orders/:id', (req, res) => {        
    var id = req.params.id;
    const order = Order(req.body, id);
    console.log("Actualizando orden");
    console.log(order);
    console.log(id);
    firebaseHelper.firestore.updateDocument(db, collection, id, order).then(
        result => {
            res.status(200).json(
                Message('Orden actualizada', `Orden con el id ${id} fue actualizada correctamente`, 'success')
            )
        }).catch(err => {
    res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));
});
});


routes.get('/orders/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => {
                let orderQuery = Order(doc, doc.id);
                console.log(orderQuery);
                res.status(200).json(orderQuery);
            })
        .catch(err => res.status(400).json({message: `An error has ocurred ${err}`}));    
});

routes.delete('/orders/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).json(Message('Orden eliminada'
        , `La orden con el id ${id} fue elimina`
        , 'success'));    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido', `${err}`, 'error'))
    }
});
//-------------------------------------------------------------------------

export { routes };