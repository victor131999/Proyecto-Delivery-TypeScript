import {Application} from 'express';
import { createCustomer, retrieveCustomer, updateCustomer, deleteCustomer, countCustomer, listCustomer,ComboCustomer } from './controllers/customer';
import { createMotorized, retrieveMotorized, updateMotorized, deleteMotorized, countMotorized, listMotorized,ComboMotorized } from './controllers/motorized';
import { createLocal, retrieveLocal, updateLocal, deleteLocal, countLocal, listLocal } from './controllers/local';
import { createProduct, retrieveProduct, updateProduct, deleteProduct, countProduct, listProduct,LoadProduct } from './controllers/product';
import { createCharge, retrieveCharge, updateCharge, deleteCharge, countCharge, listCharge } from './controllers/charge';
import { signUp } from './controllers/auth';

export function routesCustomer(app: Application) {
    app.post('/api/customers', createCustomer);
    app.get('/api/customers/:id', retrieveCustomer);
    app.put('/api/customers/:id', updateCustomer);
    app.delete('/api/customers/:id', deleteCustomer);
    app.get('/api/count/customers', countCustomer);
    app.get('/api/page/customers/:page/:limit', listCustomer);
    app.get('/api/customers', ComboCustomer);
}

export function routesMotorized(app: Application) {
    app.post('/api/motorizeds', createMotorized);
    app.get('/api/motorizeds/:id', retrieveMotorized);
    app.put('/api/motorizeds/:id', updateMotorized);
    app.delete('/api/motorizeds/:id', deleteMotorized);
    app.get('/api/count/motorizeds', countMotorized);
    app.get('/api/page/motorizeds/:page/:limit', listMotorized);
    app.get('/api/motorizeds', ComboMotorized);
}

export function routesLocal(app: Application) {
    app.post('/api/locals', createLocal);
    app.get('/api/locals/:id', retrieveLocal);
    app.put('/api/locals/:id', updateLocal);
    app.delete('/api/locals/:id', deleteLocal);
    app.get('/api/count/locals', countLocal);
    app.get('/api/page/locals/:page/:limit', listLocal);
}

export function routesProduct(app: Application) {
    app.post('/api/products', createProduct);
    app.get('/api/products/:id', retrieveProduct);
    app.put('/api/products/:id', updateProduct);
    app.delete('/api/products/:id', deleteProduct);
    app.get('/api/count/products', countProduct);
    app.get('/api/page/products/:page/:limit', listProduct);
    app.get('/api/load/products', LoadProduct);

}


export function routesCharge(app: Application) {
    app.post('/api/charges', createCharge);
    app.get('/api/charges/:id', retrieveCharge);
    app.put('/api/charges/:id', updateCharge);
    app.delete('/api/charges/:id', deleteCharge);
    app.get('/api/count/charges', countCharge);
    app.get('/api/page/charges/:page/:limit', listCharge);
}

export function routesAuth(app: Application) {
    app.post('/api/auth/signup', signUp);    
}