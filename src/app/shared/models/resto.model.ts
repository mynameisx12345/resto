export interface CottageI {
    id: string;
    name: string;
    price: number;
    qrCode: string;
}

export interface ProductI {
    id: string,
    img: string,
    description:string,
    price:string,
    type:string,
    subType:string,
    name:string,
    prices:{price:number,size:string}[]
}