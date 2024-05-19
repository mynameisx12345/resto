import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListService } from '../menu-list.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderList } from '../menu-list.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements AfterViewInit, OnDestroy{
  destroy$ = new Subject;
  constructor(private readonly menuService: MenuListService){}



  dataSource = new MatTableDataSource();
  displayedColumns = [
    'cottageParsed',
    'orderType',
    'subtotal',
    'cottageFee',
    'grandTotal',
    'paidAmount',
    'status',
    'action'
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.menuService.orderList$.pipe(takeUntil(this.destroy$)).subscribe((orderList:OrderList[])=>{
        const notPaidOrderList: OrderList[] = orderList.filter(order=>order.status !== 'Paid')
        const parsedOrderList = notPaidOrderList.map((order:OrderList)=>{
          const cottageParsed = order.cottage.map((cot:any)=>cot.name).join(', ');
          
          return {...order, cottageParsed}
        })

        this.dataSource.data = parsedOrderList;
      })
      
    }, 0);
   
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  paid(order:OrderList){
    order.status = 'Paid';
    this.menuService.updateOrderList(order);
  }
}
