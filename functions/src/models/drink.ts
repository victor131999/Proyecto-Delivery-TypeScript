//------------------------------Modelo de Drink----------------------------------------//
export interface Drink {
    idDrink?:string;
    name : string;
    cost : string;
    image : string;

}
export function Drink( data:any,id?:string){
    const { name,cost,image } = data;
    let object:Drink={
        idDrink:id,
        name:name,
        cost:cost,
        image:image,

    };
    return object;
}

//-------------------------------------------------------------------------------------//
