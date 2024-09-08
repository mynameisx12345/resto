export interface Orders{
  id:string,
  name: string,
  quantity: number,
  price: number,
  total: number,
  size: string,
  status: string
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

export interface ByProductItem{
  orderId: number,
    size: string,
    quantity: number, 
    cottageName: string,
    status: string
}

export interface ByProduct{
  name: string,
  orderedCottages: ByProductItem[]
 
}