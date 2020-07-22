
export interface Client {
    idclient? : string,
    name? : string,
    direction? : string,
    identy? : string,
    active? : string,
    phone? : string
}

export function Client(data:any, id?: string){
    const {  name,direction, identy, active, phone } = data;

    let object:Client={
        idclient: id,
        name: name === undefined ?  null : name,
        direction: direction === undefined ?  null : direction,
        identy:identy === undefined ?  null : identy,
        active:active === undefined ?  null : active,
        phone:phone === undefined ?  null : phone
    };
    return object;
}


export interface Local {
    idlocal?:string;
    name? : string
    direction? : string
}
export function Local(id:string, data:any){
    let object:Local={
        idlocal:id,
        name:data.name,
        direction:data.direction,
    };
    return object;
}

export interface Motorized {
    idmotorized?:string;
    name? : string
    vehicle? : string
}
export function Motorized(id:string, data:any){
    let object:Motorized={
        idmotorized:id,
        name:data.name,
        vehicle:data.vehicle,
    };
    return object;
}


export interface Message {
    tittle: string;
    text:string;
    icon:string;
  }
export function Message(tittle:string,text:string,icon:string){
let message : Message={
    tittle:tittle,
    text:text,
    icon:icon
}
return message;
}


export interface Order {
    idorder?:string,
    subtotal : number,
    typeiva: string,
    aumont:number,
    state:string
}
export function Order(id:string,data:any){
    let object :Order={
        idorder:id,
        subtotal:data.subtotal,
        typeiva:data.typeiva,
        aumont:data.aumont,
        state:data.state
    };
    return object;
}

export interface detailorder {
    datetime : Date    
    product:string
    quantity : number
    description : string
    ordertid : string
    //total:number
}

/*============ Facturas ============*/
export interface Bill {
    idbill? :string,
    date: string,
    clientid: string,
    orderid: string,
    product: string,
    description:string,
    quantity:number,
    total: number,
    order?: Order,
    client?: Client
}

export function Bill(id: string, data :any){    
    let object :Bill = { 
        idbill: id,
        date: data.date,
        clientid: data.clientid,
        orderid: data.ordertid,
        product: data.product,
        description:data.description,
        quantity:data.quantity,
        total: data.total,
        order : Order(data.order.id, data.order),
        client :Client(data.client, data.client.id)
    };    
    return object;
}