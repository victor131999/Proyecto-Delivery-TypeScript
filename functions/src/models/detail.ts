//------------------------------Modelo de Detail----------------------------------------//
export interface Detail {
    idproduct?:string,
    name : string,
    brand:string,
    subtotal:number
}
export function Detail(data:any,id?:string){
    const { name,brand,subtotal} = data;
    let object:Detail={
        idproduct:id,
        name:name,
        brand:brand,
        subtotal:subtotal

    };
    return object;
}
//-------------------------------------------------------------------------------------//
