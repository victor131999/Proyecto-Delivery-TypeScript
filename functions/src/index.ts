import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

//inicualizacion de la aplicacion para produccion o de forma loca(el codigo comentado es para trabajar de forma local)
admin.initializeApp(functions.config().firebase);


/*admin.initializeApp({
    credential: admin.credential.cert(require('../../serviceAccountKey.json')),
    databaseURL: "https://proyecto-delivery-typesc-9f79b.firebaseio.com"
});*/

const db = admin.firestore();
db.settings({ignoreUndefinedProperties:true});//se puede utilizar atributos nulos en el llamado


const main = express();
main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
main.use('/api', require('./auth').routes);
main.use('/api', require('./client').routes);
main.use('/api', require('./order').routes);
main.use('/api', require('./local').routes);
main.use('/api', require('./motorized').routes);
main.use('/api', require('./bill').routes);
main.use('/api', require('./product').routes);

export const api = functions.https.onRequest(main);
export { db };//exportacion de la base de datos


