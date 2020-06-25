import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const collection = "orders";
const routes = Router();
const db = main.db;

interface Order {
    datetime : Date
    clientid : string
    subtotal : number
    typeiva: string
    aumont:number
    state:string
}

interface detailorder {
    datetime : Date    
    product:string
    quantity : number
    description : string
    ordertid : string
    //total:number
}


 function getsubtotal(typeiva: string, aumont:number) {
    if(typeiva === "N"){
        return aumont;
    }else if(typeiva === "P"){
        return  1.12 *aumont;
    }
    return aumont;
}

/*function getstate(state: string) {
    if(state === "SI"){
        return "delivered";
    }else if(state === "NO"){
        return  "Undelivered";
    }
    return "in process";
}*/
/*function gettotal(getsubtotal: number,quantity:number){
    return getsubtotal*quantity;
}*/



routes.post('/orders', async (req, res) => {           
    try{ 
        const newOrder : Order = {
            datetime: new Date(),
            clientid: req.body['clientid'],
            typeiva: req.body['typeiva'],
            aumont: req.body['aumont'],
            state: req.body['state'],
            subtotal: getsubtotal(req.body['typeiva'],req.body['aumont'])             
        }
        const OrderAdded = await firebaseHelper.firestore
            .createNewDocument(db, collection, newOrder);
        res.status(201).send(`Order was added to collection with id ${OrderAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/orders', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});


routes.patch('/orders/:id', async(req, res) => {
    try{    
        const Order : Order = {
            datetime: new Date(),
            clientid: req.body['clientid'],
            typeiva: req.body['typeiva'],
            aumont: req.body['aumont'],
            state: req.body['state'],
            subtotal: getsubtotal(req.body['typeiva'],req.body['aumont'])               
        }
        firebaseHelper.firestore
            .updateDocument(db, collection, req.params.id, Order);
        res.status(200).send(`Order with id ${req.params.id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/orders/:id', (req,res)=>{    
    firebaseHelper.firestore.getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});


routes.delete('/orders/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).send(`Order was deleted ${id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//-------------------------------------------------------------------------

// -----------GRUDS de las subcollection en este caso detailorders---------------
//Crear una subcollection
routes.post('/orders/:id/detailorders',  (req, res) => {
    let OrderRef = db.collection(collection).doc(req.params.id);
    const newdetailorder : detailorder = {
        datetime: new Date(),                
        description: req.body['description'],
        //description: getstate(req.body['state']),
        quantity: req.body['quantity'],
        product: req.body['product'],
        ordertid: req.body['orderid'],
       // total: req.body['total']
        //total:gettotal(req.body['getsubtotal'],req.body['quantity'])
        
    }
    OrderRef.collection('detailorders').add(newdetailorder)
    .then(detailorderAdded => {
        res.status(201).send(`Order's detailorder was added to collection with id ${detailorderAdded.id}`);    
    }).catch(err => { res.status(400).send(`An error has ocurred ${err}`) })
    
});


//opcional, muestra los datos de orders y detailorders a la vez
routes.get('/orders/and/detailorders',(req,res)=>{   
    firebaseHelper.firestore.backup(db, collection, "detailorders")
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});
//--------------------------------------------------------------------------------

//Listar las detailorders
routes.get('/orders/:id/detailorders',(req,res)=>{   
    var detaillist= db.collection(collection).doc(req.params.id).collection('detailorders');
    detaillist.get().then(list =>{
        res.status(201).send(list.docs.map(doc=>doc.data()))
    }).catch(err => res.status(400).send(`An error has ocurred ${err}`));
});


//Llamar a una detailorders en especifico por su id
routes.get('/orders/:id/detailorders/:iddet',(req,res)=>{   
    var or= db.collection(collection).doc(req.params.id).collection('detailorders').doc(req.params.iddet);
    or.get().then(doc =>{
        res.status(201).send(doc.data())
    })
});

//Actualizar los datos de una detailorders en especifico
/*routes.patch('/orders/:id/detailorders/:iddet', async(req, res) => {
    try{    
        const detailorder : detailorder = {
            datetime: new Date(),                
            description: req.body['description'],
            quantity: req.body['quantity'],
            product: req.body['product'],
            ordertid: req.body['orderid']              
        }
        
        const docUpdated = await firebaseHelper.firestore
            .updateDocument(db, "detailorders", req.params.iddet, detailorder);
        res.status(200).send(`Order with id ${docUpdated.req.params.iddet} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});*/

//borrar una detailorders en especifico
routes.delete('/orders/:id/detailorders/:iddet', async (req, res) => {
    try{        
        await firebaseHelper.firestore
            .deleteDocumentFromSubcollection(db, collection,req.params.id,"detailorders",req.params.iddet);
        res.status(200).send(`Order was deleted ${req.params.iddet}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

export { routes };