//------------------------------Modelo de Message----------------------------------------//
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

//-------------------------------------------------------------------------------------//
