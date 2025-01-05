export interface Orders{
  id:string,
  quantity: number,
  price: number,
  total: number,
  status: string,
  itemId: any,
  itemName: string,
  itemSize: string,
  orderHdrId: any
}

export interface OrderList{
  id?: any,
  cottage: any,
  orderType?: string,
  subTotal: number,
  cottageFee: number,
  grandTotal: number,
  paidAmount: number,
  status: string,
  details: Orders[],
  mode?: 'dinein'| 'takeout', //orderType
  area?: string,
  areaFee?:number, // cottageFee
  discount?:number,
  payMode?: 'paynow' | 'paylater',
  dttmOrder?: string,
}

export interface ByProductItem{
  orderId: number,
  size: string,
  quantity: number, 
  cottageName: string,
  status: string
}

export interface ByProduct{
  id:any,
  name: string,
  category: string,
  subCategory?: string,
  orderedCottages: ByProductItem[]
 
}

export interface OrderByCottage {
  cottage: string,
  orderList:any[];
}