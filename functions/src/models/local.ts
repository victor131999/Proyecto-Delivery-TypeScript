//------------------------------Modelo de local----------------------------------------//
export interface Local {
    idlocal?:string;
    name : string
    direction : string,
    created_by? : string,
    created_at : string
}
export function Local(data:any,id?:string, username? : string){
    const { name,direction } = data;
    let object:Local={
        idlocal:id,
        name:name,
        direction:direction,
        created_by : username,
        created_at : new Date().toUTCString()
    };
    return object;
}
//-------------------------------------------------------------------------------------//
