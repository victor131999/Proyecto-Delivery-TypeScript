//------------------------------Modelo de Product----------------------------------------//
export interface Product {
    idproduct?:string,
    name : string,
    brand:string,
    description:string,
    typeiva:string,
    cost:number,
    subtotal:number
}
export function Product(data:any,id?:string){
    const { name,description,brand,typeiva,cost,subtotal} = data;
    let object:Product={
        idproduct:id,
        name:name,
        brand:brand,
        description:description,
        typeiva:typeiva,
        cost:cost,
        subtotal:subtotal

    };
    return object;
}
//-------------------------------------------------------------------------------------//
