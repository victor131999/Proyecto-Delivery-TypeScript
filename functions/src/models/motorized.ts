//------------------------------Modelo de Motorized----------------------------------------//
export interface Motorized {
    idmotorized?:string;
    brand : string;
    vehicle : string
}
export function Motorized( data:any,id?:string){
    const { brand,vehicle } = data;
    let object:Motorized={
        idmotorized:id,
        brand:brand,
        vehicle:vehicle
    };
    return object;
}

//-------------------------------------------------------------------------------------//
