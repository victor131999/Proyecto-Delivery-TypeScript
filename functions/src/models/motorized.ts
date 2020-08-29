//------------------------------Modelo de Motorized----------------------------------------//
export interface Motorized {
    idmotorized?:string;
    brand : string;
    vehicle : string;
    owner:string;
    disponibility:string
}
export function Motorized( data:any,id?:string){
    const { brand,vehicle,owner,disponibility } = data;
    let object:Motorized={
        idmotorized:id,
        brand:brand,
        vehicle:vehicle,
        owner:owner,
        disponibility:disponibility
    };
    return object;
}

//-------------------------------------------------------------------------------------//
