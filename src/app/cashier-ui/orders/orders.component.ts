import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListService } from '../menu-list.service';
import { Subject, map, takeUntil } from 'rxjs';
import { OrderByCottage, OrderList } from '../menu-list.model';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements AfterViewInit, OnDestroy{
  destroy$ = new Subject;
  constructor(private readonly menuService: MenuListService,
    private readonly commonService: CommonService
  ){}

  defaultViewOrder$ = this.commonService.defaultView$.pipe(
    map((view)=>{
      return view?.order
    }));

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

  orderList$ = this.menuService.orderList$.pipe(
    map((orderList:OrderList[])=>{
      const notPaidOrderList: OrderList[] = orderList.filter((order:any)=>order.status !== 'Paid')
      const parsedOrderList = notPaidOrderList.map((order:OrderList)=>{
        const cottageParsed = order.cottage.map((cot:any)=>cot.name).join(', ');
        return {...order, cottageParsed}
      })

      return parsedOrderList;
  }))

  ordereListByCottage$ = this.orderList$.pipe(
    map((orders)=>{
      let orderListByCottage:OrderByCottage[] = [];
      orders.forEach((order)=>{
        const byCottage= orderListByCottage.find((list:OrderByCottage)=>list.cottage === order.cottageParsed)
        if(byCottage){
          byCottage.orderList.push(order);
        } else {
          orderListByCottage.push({cottage:order.cottageParsed, orderList:[order]})
        }
      })

      return orderListByCottage;
    })
  )

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.orderList$.pipe(takeUntil(this.destroy$)).subscribe((orderList:any)=>{
        this.dataSource.data = orderList
      })
      // this.menuService.orderList$.pipe(takeUntil(this.destroy$)).subscribe((orderList:OrderList[])=>{
      //   const notPaidOrderList: OrderList[] = orderList.filter(order=>order.status !== 'Paid')
      //   const parsedOrderList = notPaidOrderList.map((order:OrderList)=>{
      //     const cottageParsed = order.cottage.map((cot:any)=>cot.name).join(', ');
          
      //     return {...order, cottageParsed}
      //   })

      //   this.dataSource.data = parsedOrderList;
      // })
      
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
