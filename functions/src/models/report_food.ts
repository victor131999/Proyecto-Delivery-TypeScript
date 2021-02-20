//------------------------------Modelo de Reservacion de Food----------------------------------------//
/*============ Report ============*/
export interface Report {
    idreport? :string,
    date: string,
    user: string,
    type: string,
    image: string,
    message: string
}

export function Report(data :any, id?: string){
    let object :Report = { 
        idreport: id,        
        date: new Date().toUTCString(),
        user: "test",
        type : data.type,
        image: data.image,
        message: data.message
    };
    return object;
}

//-------------------------------------------------------------------------------------//
