import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { routesCustomer,routesMotorized,routesLocal,routesProduct, routesCharge,routesAuth } from './router';

//inicualizacion de la aplicacion para produccion o de forma loca(el codigo comentado es para trabajar de forma local)
admin.initializeApp(functions.config().firebase);


/*admin.initializeApp({
    credential: admin.credential.cert(require('../../serviceAccountKey.json')),
    databaseURL: "https://proyecto-delivery-typesc-9f79b.firebaseio.com"
});*/

const db = admin.firestore();
db.settings({ignoreUndefinedProperties:true});//se puede utilizar atributos nulos en el llamado
//---------------------------------------------------------------------------------//

//============= SERVIDOR EXPRESS ================//
const server = express();
server.use(cors({origin: true}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

//============= RUTAS ================//
routesCustomer(server);
routesMotorized(server);
routesLocal(server);
routesProduct(server);
routesCharge(server);
routesAuth(server);

export const api = functions.https.onRequest(server);
export { db };//exportacion de la base de datos


