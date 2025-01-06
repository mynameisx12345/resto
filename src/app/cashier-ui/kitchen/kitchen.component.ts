import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuListService } from '../menu-list.service';
import { BehaviorSubject, Subject, combineLatest, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { ByProduct, ByProductItem, OrderList } from '../menu-list.model';
import { PRODUCTS, REFRESH_RATE } from '../../shared/constants/resto.constant';
import { CommonService } from '../../shared/services/common.service';
import { AdminService, Item } from '../../admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss',
})
export class KitchenComponent implements OnInit, OnDestroy {
  loadOrderList = new BehaviorSubject(false);

  products = PRODUCTS;
 //
  items:Item[] = [];

  onDestroy$ = new Subject;

  loadOrders$ = new BehaviorSubject(false);
  getOrders$ = this.loadOrders$.pipe(
    filter(load=>load),
    switchMap(()=>this.menuService.getOrders()),
    tap(()=>{
      this.loadOrders$.next(false);
    }),
    takeUntil(this.onDestroy$)
  )

  selectedOrder:OrderList | null = null;

  queue$:any = this.menuService.orderList$.pipe(
    map((orderList:OrderList[])=>{
      return orderList.filter((order:OrderList)=>order.status==='Preparing')
    }),
    tap((orderList:OrderList[])=>{
      console.log('selectedorder', this.selectedOrder)
      //  if(!this.selectedOrder){
      //   this.selectedOrder = orderList.length > 0 ?  orderList[0] : null;
      //  }
      
    })
  );

  

  orders: OrderList[] | null = null;
  orderList$:any = this.menuService.orderList$.pipe(
    map((orderList: OrderList[]) => {
      this.orders = orderList;
      const filteredOrderList = orderList.filter(
        (order) => order.status === 'Preparing'
      );

      console.log('orderskit', filteredOrderList)
      //return this.orderList;
      const parsedOrderList = filteredOrderList.map((order: OrderList) => {
        // const cottageParsed = order.cottage
        //   .map((cot: any) => cot.name)
        //   .join(', ');
        return { ...order };
      });

      console.log('orders', filteredOrderList);

      let viewByProduct: ByProduct[] = [];
      parsedOrderList.forEach((parsedOrder) => {
        parsedOrder.details.forEach((detail) => {
          const isExist = viewByProduct.find(
            (byProduct) => byProduct.id === detail.itemId
          );
          if (isExist) {
            isExist.orderedCottages.push({
              orderId: parsedOrder.id,
              size: detail.itemSize,
              quantity: detail.quantity,
              cottageName: parsedOrder.area || '',
              status: detail.status
            });
          } else {
            const productInfo = this.items.find(product=>product.id === detail.itemId);
            viewByProduct.push({
              id: detail.itemId,
              name: detail.itemName,
              category: productInfo?.categoryName || '',
              subCategory: productInfo?.subcategoryName || '',
              orderedCottages: [
                {
                  orderId: parsedOrder.id,
                  size: detail.itemSize,
                  quantity: detail.quantity,
                  cottageName: parsedOrder.area || '',
                  status: detail.status
                },
              ],
            });
          }
        });
      });

      console.log('order by product', viewByProduct);
      return viewByProduct;
    })
  );

 

  categorized$:any = this.orderList$.pipe(
    withLatestFrom(this.commonService.kitchenCategory$),
    map(([orders,categories]:any[])=>{

      console.log('kit123', orders,categories)
      
      let categorized:any = [];
      categories.forEach((category:any)=>{
        const categorizedOrder = orders.filter((order:any)=>{
          return order.category === category || order.subCategory === category
        })

        if(categorizedOrder.length > 0) {
          categorized.push({category: category, orders: categorizedOrder})
        }

        
      })
      console.log('categorized', categorized)
      return categorized;
    })
  )

  orderListLoad$ = this.loadOrderList.pipe(
    filter(load=>load),
    switchMap(this.categorized$),
    tap(()=>{
        this.loadOrderList.next(false);
    })
  )
  constructor(private readonly menuService: MenuListService, 
    private readonly commonService: CommonService,
    private readonly adminService: AdminService,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
      //this.loadOrderList.next(true);

      this.getOrders$.subscribe()
      this.loadOrders$.next(true);

      setInterval(()=>{
       // this.loadOrderList.next(true);
        this.loadOrders$.next(true);
      },REFRESH_RATE)

      this.adminService.items$.pipe(
        takeUntil(this.onDestroy$),
        tap((items)=>{
          console.log('items',items)
          this.items = items;
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  serve$(order: OrderList) {
    order.status = 'Served';
    return this.menuService.updateOrderList(order);
  }

  changeStatus(status: string, product: string, cottageInfo: ByProductItem) {
    
    let order = this.orders?.find((order) => order.id === cottageInfo.orderId);
    if (order) {
      let orderItem = order?.details.find(
        (det) => det.itemId == product && det.itemSize === cottageInfo.size
      );
      console.log('order123', order,orderItem)
      if (orderItem) {
        orderItem.status = status;
        this.menuService.updateDtlStatus(orderItem).pipe(
          takeUntil(this.onDestroy$),
          tap((res:any)=>{
            



            this.snackbar.open(`${orderItem.itemName}'s status is ${status}`,'',{
              duration:3000,
              verticalPosition:'top'
            });

            let isAllServed = res?.isHeaderServed
            if(isAllServed){
              order.status='Served';
            }
            this.menuService.updateOrderList(order);
            this.loadOrderList.next(true);
          })
        ).subscribe()
      }


      
    }
  }

  closePanel(order:ByProduct){
    return order.orderedCottages.filter(ord=>ord.status!== 'Served').length === 0
  }

  selectQueue(order:OrderList){
    console.log('selected', this.selectedOrder, order)
    if(this.selectedOrder?.id === order.id){
      console.log('selected null')
      this.selectedOrder = null
    } else {
      this.selectedOrder = order;
    }
  }

  tooltipShow(order:OrderList){
    return `Time Ordered: ${moment(order.dttmOrder).format('hh:mm A')}`
  }
}
