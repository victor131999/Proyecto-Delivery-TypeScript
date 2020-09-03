//Revisa el token de la authorization en el header de la 
//petición y determina permiso de Authentication / Authorization
import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { Message } from "./models/message";

export async function isAuthenticated(req: Request, res: Response, next: Function) {
    const { authorization } = req.headers
 
    if (!authorization)
        return res.status(401).send(Message( 'Unauthorized','Without authorization','warning'));
 
    if (!authorization.startsWith('Bearer'))
        return res.status(401).send(Message( 'Unauthorized','Not start validation authorization','warning'));
 
    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send(Message( 'Unauthorized','Not valid authorization','warning'));
 
    const token = split[1]
 
    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        console.log("decodedToken", JSON.stringify(decodedToken))
        res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
        return next();
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        return res.status(401).send({ message: 'Unauthorized - not valid token' });
    }
}

export function isAuthorized(opts: { hasRole: Array<'admin' | 'customer' | 'userlocal'| 'usermotorized'>}) {
    return (req: Request, res: Response, next: Function) => {
        const { role } = res.locals

        if (!role)
            return res.status(403).send(Message( 'Unauthorized','Not valid Role','error'));
 
        if (opts.hasRole.includes(role))
            return next();
 
        return res.status(403).send(Message( 'Unauthorized','Not valid Role','error'));
    }
 }










