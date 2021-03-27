//------------------------------Modelo de Combo----------------------------------------//
export interface Combo {
    idCombo?:string;
    fusion : string;
    cost : string;
    image : string;
    description: string;

}
export function Combo( data:any,id?:string){
    const { fusion,cost,image, description } = data;
    let object:Combo={
        idCombo:id,
        fusion:fusion,
        cost:cost,
        image:image,
        description:description,

    };
    return object;
}

//-------------------------------------------------------------------------------------//
