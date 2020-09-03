//------------------------------Modelo de orden----------------------------------------//
export interface Customer {
    idcustomer? : string,
    name : string,
    direction : string,
    identy : string,
    active : string,
    phone : string,
    created_by? : string,
    created_at : string
}

export function Customer( data: any,id?:string, username? : string){
    const { name, direction, identy, active,phone } = data;
    let object:Customer={
        idcustomer: id,
        name: name,
        direction:direction,
        identy:identy,
        active:active,
        phone:phone,
        created_by : username,
        created_at : new Date().toUTCString()
    };
    return object;
}
//-------------------------------------------------------------------------------------//
