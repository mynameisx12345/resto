export interface Orders{
  id:string,
  name: string,
  quantity: number,
  price: number,
  total: number,
  size: string
}

export interface OrderList{
  id: any,
  cottage: any,
  orderType: string,
  subtotal: number,
  cottageFee: number,
  grandTotal: number,
  paidAmount: number,
  status: string,
  details: Orders[]
}