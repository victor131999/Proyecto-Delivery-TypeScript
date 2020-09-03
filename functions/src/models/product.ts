//------------------------------Modelo de Product----------------------------------------//
export interface Product {
    idproduct?:string,
    name : string,
    brand:string,
    description:string,
    typeiva:string,
    cost:number,
    subtotal:number,
    created_by? : string,
    created_at : string
}
export function Product(data:any,id?:string, username? : string){
    const { name,description,brand,typeiva,cost,subtotal} = data;
    let object:Product={
        idproduct:id,
        name:name,
        brand:brand,
        description:description,
        typeiva:typeiva,
        cost:cost,
        subtotal:subtotal,
        created_by : username,
        created_at : new Date().toUTCString()

    };
    return object;
}
//-------------------------------------------------------------------------------------//
