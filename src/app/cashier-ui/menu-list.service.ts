import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderList, Orders } from './menu-list.model';
@Injectable({
  providedIn: 'root'
})


export class MenuListService {

  constructor() { }

  private orders:BehaviorSubject<any> = new BehaviorSubject([]);

  orders$ = this.orders.asObservable();

  setNewOrders(orders:Orders[]){
    this.orders.next(orders);
  }


  addNewOrders(newOrder:Orders){
    let currentOrders = this.orders.value;

    const currentItem:Orders = currentOrders.find((order:Orders)=>order.id===newOrder.id && order.size === newOrder.size);

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

  orderList = new BehaviorSubject([]);
  orderList$ = this.orderList.asObservable();

  addOrderList(order:OrderList){
    const currentOrderList:any = this.orderList.value;
    console.log('listvalue', order)
    currentOrderList.push(order);
    this.orderList.next(currentOrderList);
  }

  updateOrderList(order:OrderList){

    const currentOrderList: any = this.orderList.value;
    const index = currentOrderList.findIndex((curOrder:OrderList)=>curOrder.id === order.id);
    currentOrderList[index] = order;
    this.orderList.next(currentOrderList);
  }
}
