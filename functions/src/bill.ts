  
import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Bill,Customer,Order} from './models';

const routes = Router();
const db = main.db;
const collection = "bills";


async function getTotal(quantity:number, oid:string){
    const order = await firebaseHelper.firestore.getDocument(db, 'orders', oid);
           return  quantity*order.subtotal;
}

routes.post('/bills', async (req, res) => {           
    try{      
        let costTotal = await getTotal(req.body['quantity'], req.body['orderid']);
        
        const newBill : Bill = {
            date: new Date().toUTCString(), 
            orderid: req.body['orderid'],            
            customerid: req.body['customerid'],
            product: req.body['product'],
            description: req.body['description'],
            quantity: req.body['quantity'],
            total: costTotal
        };    
        //Consulta la orden de la colección 'orders'
        const customer = await db.collection("customers").doc(req.body['customerid']).get();
        //Agrega la orden al objecto 'newBill'
        newBill.customer = Customer(customer.id, customer.data());
        //Consulta la persona de la colección 'customers'
        const order = await db.collection("orders").doc(req.body['orderid']).get();
        //Agrega la persona al objecto 'newBill'
        newBill.order = Order(order.data(), order.id);

        const id = (await db.collection(collection).add(newBill)).id;                
        res.status(201).send(`Registration was added to collection with id ${id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/bills/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

routes.patch('/bills/:id', async(req, res) => {
    try{       
        let costValue = await getTotal(req.body['quantity'], req.body['customerid']);
        let id = req.params.id;
        const bill : Bill = {
            date: new Date().toUTCString(), //Obtiene la fecha del servidor
            customerid: req.body['customerid'],
            orderid: req.body['orderid'],
            product: req.body['product'],
            description: req.body['description'],
            quantity: req.body['quantity'],
            total: costValue
        };   
        await firebaseHelper.firestore.updateDocument(db, collection, id, bill);
        res.status(200).send(`Order with id ${id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/bills/:id', async (request, response) => {
    try{        
        let id = request.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        response.status(200).send(`order document with id ${id} was deleted`);
    }
    catch(err){
        response.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/bills', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});


routes.get('/orders/:id/bills', (req, res) =>{            
    db.collection(collection).where('orderid','==',req.params.id).get()
    .then(snapshot => res.status(200).json(snapshot.docs.map(doc => Bill(doc.id, doc.data())))
    ).catch(err => res.status(400).send(`An error has ocurred ${err}`));;         
    
});



export { routes };