//------------------------------Modelo de Motorized----------------------------------------//
export interface Motorized {
    idmotorized?:string;
    brand : string;
    vehicle : string;
    owner:string;
    disponibility:string,
    Ordersplaced:number,
    created_by? : string,
    created_at : string
}
export function Motorized( data:any,id?:string, username? : string){
    const { brand,vehicle,owner,disponibility,Ordersplaced } = data;
    let object:Motorized={
        idmotorized:id,
        brand:brand,
        vehicle:vehicle,
        owner:owner,
        disponibility:disponibility,
        Ordersplaced:Ordersplaced,
        created_by : username,
        created_at : new Date().toUTCString()
    };
    return object;
}

//-------------------------------------------------------------------------------------//
