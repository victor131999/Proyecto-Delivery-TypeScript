
import { Customer } from "./customer";
import { Motorized } from "./motorized";
import { Local } from "./local";
import { Detail } from "./detail";
//------------------------------Modelo de charge----------------------------------------//
export interface Charge {
    idcharge?:string,
    total :number,
    description:string,
    date:string,
    state:string,
    idcustomer: string,
    idmotorized: string,
    customer?: Customer,
    motorized?: Motorized,
    idlocal:string,
    local?:Local,
    details:Array<Detail>,
    created_by? : string,
    created_at : string
   
}
export function Charge(data:any,id?:string, username? : string){
    const {total,description,state,idcustomer, idmotorized,idlocal, customer, motorized,local,details}=data
    let object :Charge={
        idcharge:id,
        total:total,
        description:description,
        date: new Date().toDateString(),
        state:state,
        idcustomer: idcustomer,
        idmotorized: idmotorized,
        customer: customer,
        motorized: motorized,
        idlocal:idlocal,
        local:local,
        details:details,
        created_by : username,
        created_at : new Date().toUTCString()
        
    };
    return object;
}
//-------------------------------------------------------------------------------------//
