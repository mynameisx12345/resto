import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { OrderList, Orders } from './menu-list.model';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})


export class MenuListService {
  apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  private orders:BehaviorSubject<any> = new BehaviorSubject([]);

  orders$ = this.orders.asObservable();

  setNewOrders(orders:Orders[]){
    this.orders.next(orders);
  }


  addNewOrders(newOrder:Orders){
    let currentOrders = this.orders.value;

    const currentItem:Orders = currentOrders.find((order:Orders)=>order.itemId===newOrder.itemId && order.itemSize === newOrder.itemSize);

    if(!!currentItem){
      currentItem.quantity++;
      currentItem.total = currentItem.quantity * currentItem.price;
    } else {
      newOrder.total = newOrder.price;
      currentOrders.unshift(newOrder);
    }

    
   this.orders.next(currentOrders);
  }

  removeOrder(deleteOrder:Orders){
    let currentOrders:Orders[] = this.orders.value;
    const orderIndex = currentOrders.findIndex((order:Orders)=>order.id === deleteOrder.id);
    currentOrders.splice(orderIndex,1);
    this.orders.next(currentOrders);
  }

  clearOrders(){
    this.orders.next([])
  }

  orderList = new BehaviorSubject<OrderList[]>([]);
  orderList$ = this.orderList.asObservable();

  addOrderList(order:OrderList){
    return this.addOrderListHttp(order).pipe(
      tap((_order)=>{
        console.log('orderres', _order)
        const currentOrderList:any = this.orderList.value;
        console.log('listvalue', order)
        currentOrderList.push(order);
       // this.orderList.next(currentOrderList);
      })
    )
    
  }

  updateOrderList(order:OrderList){
 
    const currentOrderList: any = this.orderList.value;
    const index = currentOrderList.findIndex((curOrder:OrderList)=>curOrder.id === order.id);
    currentOrderList[index] = order;
    this.orderList.next(currentOrderList);
   

    
  }

  updateOrderListHttp(order:OrderList){
    return this.http.put(`${this.apiUrl}/orders/header`,order).pipe(
      tap((res)=>{
        this.updateOrderList(order);
      })
    )
  }

  addOrderListHttp(order: OrderList){
    return this.http.post(`${this.apiUrl}/orders`,order);
  }

  getOrders(){
    return this.http.get(`${this.apiUrl}/orders/all`).pipe(
      tap((orders)=>{
        console.log('orderstosub', orders)
        this.orderList.next(orders as OrderList[]);
      })
    );
  }

  updateDtlStatus(orderDtl: Orders){
    return this.http.put(`${this.apiUrl}/orders/detail`,orderDtl)
  }

  getSalesReport(){
    return this.http.get(`${this.apiUrl}/orders/sales`);
  }
}
