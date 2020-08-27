//------------------------------Modelo de local----------------------------------------//
export interface Local {
    idlocal?:string;
    name : string
    direction : string
}
export function Local(data:any,id?:string){
    const { name,direction } = data;
    let object:Local={
        idlocal:id,
        name:name,
        direction:direction
    };
    return object;
}
//-------------------------------------------------------------------------------------//
