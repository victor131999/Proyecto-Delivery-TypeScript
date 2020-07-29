
export interface Customer {
    idcustomer? : string,
    name : string,
    direction : string,
    identy : string,
    active : string,
    phone : string
}

export function Customer(id:string, data: any){
    let object:Customer={
        idcustomer: id,
        name: data.name,
        direction:data.direction,
        identy:data.identy,
        active:data.active,
        phone:data.phone,
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
export function Order(data:any,id?:string){
    const {subtotal,typeiva,aumont,state}=data
    let object :Order={
        idorder:id,
        subtotal:subtotal === undefined ?  null : subtotal,
        typeiva:typeiva === undefined ?  null : typeiva,
        aumont:aumont === undefined ?  null : aumont,
        state:state === undefined ?  null : state,
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
    customerid: string,
    orderid: string,
    product: string,
    description:string,
    quantity:number,
    total: number,
    order?: Order,
    customer?: Customer
}

export function Bill(id: string, data :any){    
    let object :Bill = { 
        idbill: id,
        date: data.date,
        orderid: data.ordertid,
        customerid: data.customerid,
        product: data.product,
        description:data.description,
        quantity:data.quantity,
        total: data.total,
        customer :Customer(data.customer.id,data.customer),
        order : Order(data.order,data.order.id)
    };    
    return object;
}