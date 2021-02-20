//------------------------------Modelo de Reservacion de Food----------------------------------------//
/*============ Reservation ============*/
export interface Reservation {
    idresertation? :string,
    date: string,
    user: string,
    name: string,
    indentity:string,
    phone:string,
    email:string,
    totalperson: string
}

export function Reservation(data :any, id?: string){
    let object :Reservation = { 
        idresertation: id,        
        date: new Date().toUTCString(),
        user: "test",
        name: data.name,
        indentity: data.identity,
        phone:data.phone,
        email:data.email,
        totalperson: data.totalperson
    };
    return object;
}

//-------------------------------------------------------------------------------------//
