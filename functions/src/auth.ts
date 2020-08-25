import * as Router from 'express';
import * as admin from 'firebase-admin';
import { Message } from './models';


const routes = Router();

routes.post('/auth/signup', async (req, res) => {           
    try{     
        const { email, password, displayName, role } = req.body;
        const user = await admin.auth().createUser({
            email,
            password,
            displayName
        });
        await admin.auth().setCustomUserClaims(user.uid, { role });
        res.status(201).json(Message('Success', `User ${user.displayName} registred`, 'success'));                  
    }
    catch(err){
        res.status(500).json(Message('Error', `Un error ha ocurrido en el servidor ${err}`, 'error'));
    }
});

export {routes}


