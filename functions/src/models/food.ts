//------------------------------Modelo de Food----------------------------------------//
export interface Food {
    idFood?:string;
    name : string;
    cost : string;
    description : string;
    image : string;
    like:number;

}
export function Food( data:any,id?:string){
    const { name,cost,description,image,like } = data;
    let object:Food={
        idFood:id,
        name:name,
        cost:cost,
        description:description,
        image:image,
        like:like

    };
    return object;
}

//-------------------------------------------------------------------------------------//
