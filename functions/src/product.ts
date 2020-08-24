import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Product, Message } from './models';

const collection = "products";
const routes = Router();
const db = main.db;

routes.post('/products', async (req, res) => {           
    try{            
        const newproduct = Product(req.body);
        const productAdded = await firebaseHelper.firestore
        .createNewDocument(db, collection, newproduct);
        res.status(201).json(
            Message('producto agregado', `producto fue agregado con el id ${productAdded.id}`, 'success')
        );
    }
    catch(err){
        res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));
    }
});

routes.put('/products/:id', (req, res) => {        
    var id = req.params.id;
    const product = Product(req.body, id);        
    firebaseHelper.firestore.updateDocument(db, collection, id, product).then(
        result => {
            res.status(200).json(
                Message('producto actualizado', `producto con el id ${id} fue actualizada correctamente`, 'success')
            )
        }).catch(err => {
    res.status(400).json(Message('Error', `Un error ha ocurrido ${err}`, 'error'));
});
});

routes.get('/products/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => {
                let productQuery = Product(doc, doc.id);
                console.log(productQuery);
                res.status(200).json(productQuery);
            })
        .catch(err => res.status(400).json({message: `An error has ocurred ${err}`}));    
});

routes.delete('/products/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore
            .deleteDocument(db, collection, id);
        res.status(200).json(Message('producto eliminado',`El producto  con el id ${id} se elimino`,'success'));
    }
    catch(err){
        res.status(400).json(Message('Un error ha ocurrido',`${err}`,'error'));
    }
});

routes.get('/products/:page/:limit', (req, res) => {        
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    db.collection(collection).orderBy('name').offset(avoid).limit(limit).get()        
        .then(snapshot => res.status(200).json(snapshot.docs.map(doc => Product(doc.data(),doc.id))))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`)); 
});

routes.get('/count/products', (req, res) => {            
    db.collection(collection)        
        .get()
        .then(snapshot => {
            let size = snapshot.size;
            res.status(200).json( { numberDocs : size } )
        })            
        .catch(err => res.status(400).send(`An error has ocurred ${err}`)); 
});
export { routes };