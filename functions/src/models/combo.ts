//------------------------------Modelo de Combo----------------------------------------//
export interface Combo {
    idCombo?:string;
    fusion : string;
    cost : string;
    image : string;

}
export function Combo( data:any,id?:string){
    const { fusion,cost,image } = data;
    let object:Combo={
        idCombo:id,
        fusion:fusion,
        cost:cost,
        image:image,

    };
    return object;
}

//-------------------------------------------------------------------------------------//
