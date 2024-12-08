import { Component, OnInit } from '@angular/core';
import { MenuListService } from '../menu-list.service';
import { BehaviorSubject, combineLatest, filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ByProduct, ByProductItem, OrderList } from '../menu-list.model';
import { PRODUCTS } from '../../shared/constants/resto.constant';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss',
})
export class KitchenComponent implements OnInit {
  loadOrderList = new BehaviorSubject(false);

  products = PRODUCTS;

  

  orders: OrderList[] | null = null;
  orderList$:any = this.menuService.orderList$.pipe(
    map((orderList: OrderList[]) => {
      this.orders = orderList;
      const filteredOrderList = orderList.filter(
        (order) => order.status === 'Preparing'
      );
      //return this.orderList;
      const parsedOrderList = filteredOrderList.map((order: OrderList) => {
        const cottageParsed = order.cottage
          .map((cot: any) => cot.name)
          .join(', ');
        return { ...order, cottageParsed };
      });

      console.log('orders', parsedOrderList);

      let viewByProduct: ByProduct[] = [];
      parsedOrderList.forEach((parsedOrder) => {
        parsedOrder.details.forEach((detail) => {
          const isExist = viewByProduct.find(
            (byProduct) => byProduct.name === detail.name
          );
          if (isExist) {
            isExist.orderedCottages.push({
              orderId: parsedOrder.id,
              size: detail.size,
              quantity: detail.quantity,
              cottageName: parsedOrder.cottageParsed,
              status: detail.status
            });
          } else {
            const productInfo = this.products.find(product=>product.id === detail.id);
            viewByProduct.push({
              name: detail.name,
              category: productInfo?.type || '',
              subCategory: productInfo?.subType || '',
              orderedCottages: [
                {
                  orderId: parsedOrder.id,
                  size: detail.size,
                  quantity: detail.quantity,
                  cottageName: parsedOrder.cottageParsed,
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
    private readonly commonService: CommonService) {}

  ngOnInit(): void {
      this.loadOrderList.next(true);
  }

  serve(order: OrderList) {
    order.status = 'Served';
    this.menuService.updateOrderList(order);
  }

  changeStatus(status: string, product: string, cottageInfo: ByProductItem) {
    let order = this.orders?.find((order) => order.id === cottageInfo.orderId);
    if (order) {
      let orderItem = order?.details.find(
        (det) => det.name === product && det.size === cottageInfo.size
      );
      if (orderItem) {
        orderItem.status = status;
      }

      let isAllServed = order.details.filter((det)=>det.status !== 'Served').length === 0
      console.log('ordertoupdate', order);
      if(isAllServed){
        order.status='Served';
      }
      this.menuService.updateOrderList(order);
      this.loadOrderList.next(true);
    }
  }

  closePanel(order:ByProduct){
    return order.orderedCottages.filter(ord=>ord.status!== 'Served').length === 0
  }
}
