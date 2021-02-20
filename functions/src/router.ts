import {Application} from 'express';
import { createCustomer, retrieveCustomer, updateCustomer, deleteCustomer, countCustomer, listCustomer,ComboCustomer } from './controllers/customer';
import { createMotorized, retrieveMotorized, updateMotorized, deleteMotorized, countMotorized, listMotorized,ComboMotorized,Ordersplaced1,Ordersplaced2,Ordersplaced3,Ordersplaced4,Ordersplaced5 } from './controllers/motorized';
import { createLocal, retrieveLocal, updateLocal, deleteLocal, countLocal, listLocal,ComboLocal } from './controllers/local';
import { createProduct, retrieveProduct, updateProduct, deleteProduct, countProduct, listProduct,LoadProduct } from './controllers/product';
import { createCharge, retrieveCharge, updateCharge, deleteCharge, countCharge, listCharge,countChargesCustomer1,countChargesCustomer2,countChargesCustomer3,countChargesCustomer4,countChargesCustomer5,countChargesLocal1,countChargesLocal2,countChargesLocal3,countChargesLocal4 } from './controllers/charge';
import { signUp } from './controllers/auth';
import { isAuthenticated, isAuthorized } from './middleware';


import { createFood, retrieveFood, updateFood, deleteFood, countFood, listFood,/*ComboFood*/ } from './controllers/food';
import { createReservation } from './controllers/reservation';
import { createReport } from './controllers/report_food';
import { createDrink,updateDrink,retrieveDrink,countDrink,deleteDrink,listDrink } from './controllers/drink';
import { createCombo,updateCombo,retrieveCombo,countCombo,deleteCombo,listCombo } from './controllers/combo';


export function routesCustomer(app: Application) {
    app.post('/api/customers', createCustomer);
    app.get('/api/customers/:id', retrieveCustomer);
    app.put('/api/customers/:id', updateCustomer);
    app.delete('/api/customers/:id',[ isAuthenticated, isAuthorized({ hasRole: ['admin'] }), deleteCustomer ]);
    app.get('/api/count/customers', countCustomer);
    app.get('/api/page/customers/:page/:limit',[ isAuthenticated, isAuthorized({ hasRole: ['admin'] }), listCustomer ]);
    app.get('/api/customers', ComboCustomer);
}

export function routesMotorized(app: Application) {
    app.post('/api/motorizeds', createMotorized );
    app.get('/api/motorizeds/:id', retrieveMotorized);
    app.put('/api/motorizeds/:id', updateMotorized);
    app.delete('/api/motorizeds/:id', deleteMotorized);
    app.get('/api/count/motorizeds', countMotorized);
    app.get('/api/page/motorizeds/:page/:limit',[ isAuthenticated, isAuthorized({ hasRole: ['admin'] }), listMotorized ]);
    app.get('/api/motorizeds', ComboMotorized);
    app.get('/api/motorized/ordersplaced1/:id',Ordersplaced1);
    app.get('/api/motorized/ordersplaced2/:id',Ordersplaced2);
    app.get('/api/motorized/ordersplaced3/:id',Ordersplaced3);
    app.get('/api/motorized/ordersplaced4/:id',Ordersplaced4);
    app.get('/api/motorized/ordersplaced5/:id',Ordersplaced5);
}

export function routesLocal(app: Application) {
    app.post('/api/locals',[ isAuthenticated, isAuthorized({ hasRole: ['admin','userlocal'] }), createLocal ]);
    app.get('/api/locals/:id', retrieveLocal);
    app.put('/api/locals/:id', updateLocal);
    app.delete('/api/locals/:id', deleteLocal);
    app.get('/api/count/locals', countLocal);
    app.get('/api/page/locals/:page/:limit',[ isAuthenticated, isAuthorized({ hasRole: ['admin'] }), listLocal]);
    app.get('/api/locals', ComboLocal);
}

export function routesProduct(app: Application) {
    app.post('/api/products',[ isAuthenticated, isAuthorized({ hasRole: ['admin','userlocal'] }), createProduct ]);
    app.get('/api/products/:id', retrieveProduct);
    app.put('/api/products/:id', updateProduct);
    app.delete('/api/products/:id', deleteProduct);
    app.get('/api/count/products', countProduct);
    app.get('/api/page/products/:page/:limit',[ isAuthenticated, isAuthorized({ hasRole: ['admin','userlocal'] }), listProduct ]);
    app.get('/api/load/products', LoadProduct);

}


export function routesCharge(app: Application) {
    app.post('/api/charges', createCharge);
    app.get('/api/charges/:id', retrieveCharge);
    app.put('/api/charges/:id', updateCharge);
    app.delete('/api/charges/:id', deleteCharge);
    app.get('/api/count/charges', countCharge);
    app.get('/api/page/charges/:page/:limit',[ isAuthenticated, isAuthorized({ hasRole: ['admin'] }), listCharge ]);
    app.get('/api/charges/count/customer1/:id',countChargesCustomer1);
    app.get('/api/charges/count/customer2/:id',countChargesCustomer2);
    app.get('/api/charges/count/customer3/:id',countChargesCustomer3);
    app.get('/api/charges/count/customer4/:id',countChargesCustomer4);
    app.get('/api/charges/count/customer5/:id',countChargesCustomer5);
    app.get('/api/charges/count/local1/:id',countChargesLocal1);
    app.get('/api/charges/count/local2/:id',countChargesLocal2);
    app.get('/api/charges/count/local3/:id',countChargesLocal3);
    app.get('/api/charges/count/local4/:id',countChargesLocal4);
}



export function routesFood(app: Application) {
    app.post('/api/foods', createFood );
    app.get('/api/foods/:id', retrieveFood);
    app.put('/api/foods/:id', updateFood);
    app.delete('/api/foods/:id', deleteFood);
    app.get('/api/count/foods', countFood);
    app.get('/api/page/foods/:page/:limit',listFood);
    //app.get('/api/foods', ComboFood);
}

export function routesDrink(app: Application) {
    app.post('/api/drinks', createDrink );
    app.get('/api/drinks/:id', retrieveDrink);
    app.put('/api/drinks/:id', updateDrink);
    app.delete('/api/drinks/:id', deleteDrink);
    app.get('/api/count/drinks', countDrink);
    app.get('/api/page/drinks/:page/:limit',listDrink);
    //app.get('/api/foods', ComboFood);
}

export function routesCombo(app: Application) {
    app.post('/api/combos', createCombo );
    app.get('/api/combos/:id', retrieveCombo);
    app.put('/api/combos/:id', updateCombo);
    app.delete('/api/combos/:id', deleteCombo);
    app.get('/api/count/combos', countCombo);
    app.get('/api/page/combos/:page/:limit',listCombo);
    //app.get('/api/foods', ComboFood);
}

export function routesReservationFood(app: Application) {
    app.post('/api/reservations', createReservation );
}

export function routesReportFood(app: Application) {
    app.post('/api/reports', createReport );
}

export function routesAuth(app: Application) {
    app.post('/api/auth/signup', signUp);    
}