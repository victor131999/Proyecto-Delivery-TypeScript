//------------------------------Modelo de orden----------------------------------------//
export interface Customer {
    idcustomer? : string,
    name : string,
    direction : string,
    identy : string,
    active : string,
    phone : string
}

export function Customer( data: any,id?:string){
    const { name, direction, identy, active,phone } = data;
    let object:Customer={
        idcustomer: id,
        name: name,
        direction:direction,
        identy:identy,
        active:active,
        phone:phone,
    };
    return object;
}
//-------------------------------------------------------------------------------------//
