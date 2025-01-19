import { CottageI, ProductI } from "../models/resto.model";

export const REFRESH_RATE = 10000;

export const COTTAGES:CottageI[] = [
    { id: '1', name: 'Cottage 1', price: 150, qrCode: 'code1' },
    { id: '2', name: 'Cottage 2', price: 200, qrCode: 'code2' },
    { id: '3', name: 'Cottage 3', price: 100, qrCode: 'code3' },
    { id: '7', name: 'Cottage 4', price: 0 , qrCode: 'code6'},
    { id: '8', name: 'Cottage 5', price: 0 , qrCode: 'code6'},
    { id: '9', name: 'Cottage 6', price: 0 , qrCode: 'code6'},
    { id: '10', name: 'Cottage 7', price: 0 , qrCode: 'code6'},
    { id: '11', name: 'Cottage 8', price: 0 , qrCode: 'code6'},
    { id: '12', name: 'Cottage 9', price: 0 , qrCode: 'code6'},
    { id: '13', name: 'Cottage 10', price: 0 , qrCode: 'code6'},
    { id: '4', name: 'Table 1', price: 0, qrCode: 'code4' },
    { id: '5', name: 'Table 2', price: 0, qrCode: 'code5' },
    { id: '6', name: 'Table 3', price: 0 , qrCode: 'code6'},
    { id: '14', name: 'Table 4', price: 0, qrCode: 'code4' },
    { id: '15', name: 'Table 5', price: 0, qrCode: 'code5' },
    { id: '16', name: 'Table 6', price: 0 , qrCode: 'code6'},
    { id: '17', name: 'Table 7', price: 0, qrCode: 'code4' },
    { id: '18', name: 'Table 8', price: 0, qrCode: 'code5' },
    { id: '19', name: 'Table 9', price: 0 , qrCode: 'code6'},
    { id: '20', name: 'Table 10', price: 0, qrCode: 'code4' },
    { id: '21', name: 'Table 11', price: 0, qrCode: 'code5' },
    { id: '22', name: 'Table 12', price: 0 , qrCode: 'code6'},
    { id: '23', name: 'Table 13', price: 0, qrCode: 'code4' },
    { id: '24', name: 'Table 14', price: 0, qrCode: 'code5' },
    { id: '25', name: 'Table 15', price: 0 , qrCode: 'code6'},
  ]

export const PRODUCTS:ProductI[] = [
]

export const PAGES = [
  {id: 1, page:'Home',route:'/cashier/menu'},
  {id:2, page:'Orders', route:'/cashier/orders'},
  {id:3, page:'Kitchen',route:'/cashier/kitchen'},
  {id:4, page:'Sales Report',route:'/cashier/sales'},
  {id:5, page:'Admin Settings'}
]