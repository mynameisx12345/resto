import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListService } from '../menu-list.service';
import { BehaviorSubject, Subject, filter, map, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs';
import { OrderByCottage, OrderList } from '../menu-list.model';
import { CommonService } from '../../shared/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { COTTAGES, REFRESH_RATE } from '../../shared/constants/resto.constant';
import { CottageI } from '../../shared/models/resto.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements AfterViewInit, OnDestroy, OnInit{
  destroy$ = new Subject;
  constructor(private readonly menuService: MenuListService,
    private readonly commonService: CommonService,
    private readonly route: ActivatedRoute
  ){}

  defaultViewOrder$ = this.commonService.defaultView$.pipe(
    map((view)=>{
      return view?.order
    }));

  dataSource = new MatTableDataSource();
  cottages = COTTAGES;
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
  loadOrders$ = new BehaviorSubject(false);
  getOrders$ = this.loadOrders$.pipe(
    filter(load=>load),
    takeUntil(this.destroy$),
    switchMap(()=>this.menuService.getOrders()),
    tap((orders)=>{
      console.log('orderlist', orders)
      this.loadOrders$.next(false)
    })

  )

  orderList$ = this.menuService.orderList$.pipe(
    map((orderList:OrderList[])=>{
     
      const notPaidOrderList: OrderList[] = orderList.filter((order:any)=>order.status !== 'Paid')
      console.log('orderListStore', orderList,notPaidOrderList)
      const parsedOrderList = notPaidOrderList.map((order:OrderList)=>{
        //const cottageParsed = order.cottage.map((cot:any)=>cot.name).join(', ');
        return {...order}
      })
      
      return parsedOrderList;
  }))

  ordereListByCottage$ = this.orderList$.pipe(
    withLatestFrom(this.route.queryParams),
    map(([orders,param])=>{
      let orderListByCottage:OrderByCottage[] = [];
      orders.forEach((order)=>{
        const byCottage= orderListByCottage.find((list:OrderByCottage)=>list.cottage.toLowerCase() === order.area?.toLocaleLowerCase())
        if(byCottage){
          byCottage.orderList.push(order);
        } else {
          orderListByCottage.push({cottage:order.area || '', orderList:[order]})
        }
      })

      console.log('orderlisgtbycottaage', orderListByCottage)

      if(param['id']){
        this.cottageOrder = this.cottages.find((cot)=>cot.id ===param['id'])
        orderListByCottage = orderListByCottage.filter((cot)=>cot.cottage === this.cottageOrder?.name)
      }


      return orderListByCottage;
    })
  );

  cottageOrder?:CottageI;

  ngOnInit(): void {
    this.getOrders$.subscribe();
      
    
    this.loadOrders$.next(true);

    setInterval(()=>{
      this.loadOrders$.next(true);
    },REFRESH_RATE)

    this.route.queryParams.pipe(
      takeUntil(this.destroy$),
      tap((param:any)=>{
        if(param.id){
          this.cottageOrder = this.cottages.find((cot)=>cot.id ===param.id)
        }
      })
    ).subscribe();
  }

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
    this.menuService.updateOrderListHttp(order).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
