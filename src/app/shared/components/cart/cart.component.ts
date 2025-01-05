import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListService } from '../../../cashier-ui/menu-list.service';
import { Observable, Subject, combineLatest, filter, lastValueFrom, map, merge, startWith, take, takeUntil, tap, withLatestFrom, zip } from 'rxjs';
import { OrderList, Orders } from '../../../cashier-ui/menu-list.model';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { COTTAGES } from '../../constants/resto.constant';
import { CottageI } from '../../models/resto.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements AfterViewInit, OnDestroy {
  destroy$ = new Subject;
  orders$ = this.menuService.orders$.pipe(takeUntil(this.destroy$));
  total$ = this.orders$.pipe(
    map((orders: Orders[]) => {
      return orders.reduce((partialSum, order) => partialSum + order.total, 0);
    })
  );
  cottages = COTTAGES;

  orderType: 'takeout' | 'dinein'  | null = null;
  selectedCottage = new FormControl('');
  paymentAmount = new FormControl();

  isCustomerOrder = false;
  customerCottage:CottageI[] = [];

  selectedCottages$ = this.selectedCottage.valueChanges.pipe(
    map((selected) => {
      const cottages = this.cottages
        .filter((cottage) => selected?.includes(cottage.id))
      return cottages;
    }),
    startWith([])
  );

  cottageTotal$ = this.selectedCottage.valueChanges.pipe(
    map((selected) => {
      const cottageTotal = this.cottages
        .filter((cottage) => selected?.includes(cottage.id))
        .reduce((sub, cottage) => sub + cottage.price, 0);
      return cottageTotal;
    }),
    startWith(0)
  );

  grandTotal$ = combineLatest([this.cottageTotal$,this.total$]).pipe(
    map(([cottageTotal, total])=>{
      return cottageTotal + total;
    })
  );

  change$ = combineLatest([this.paymentAmount.valueChanges, this.grandTotal$]).pipe(
    map(([payment, grandTotal])=>{
      return (payment || 0) - grandTotal
    })
  )

  payMode: 'paynow' | 'paylater' | null = null;

 

  constructor(
    private readonly menuService: MenuListService,
    private readonly snackbr: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}


  dataSource = new MatTableDataSource<Orders>();
  displayedColumns = ['itemName', 'quantity', 'price', 'action'];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.orders$.subscribe((orders: Orders[]) => {
        console.log('orders1',orders)
        this.dataSource.data = orders;
      });
    }, 0);

    this.orderNow$.subscribe((orders)=>{
      this.currentOrderList = orders;
    });
    console.log('router', this.router.url);

    if(this.router.url === '/cashier/menu'){
      this.isCustomerOrder = false
    } else {
      this.isCustomerOrder = true;
      this.setOrderType('dinein');
      this.setPayMode('paylater')
    }

    this.route.queryParams.subscribe((param:any)=>{
      this.customerCottage = this.cottages.filter((cottage)=>cottage.id === param.id)
      console.log('customercottage', this.customerCottage)
    })


  }

  removeOrder(order: Orders) {
    this.menuService.removeOrder(order);
  }

  setOrderType(type: any) {
    if((this.selectedCottage?.value && this.selectedCottage.value.length > 0) && type==='takeout'){
      this.selectedCottage.setValue('');
    }
    this.orderType = type;
    if(type==='takeout'){
      this.payMode = 'paynow';
    } else {
      this.setPayMode('');
    }
  }

  setPayMode(type:any){
    this.paymentAmount.setValue(null);
    this.payMode = type;
  }

  get paymentVisibility(){
    return this.orderType && (this.orderType === 'takeout' || (this.orderType ==='dinein' && !!this.selectedCottage.value))
  }

  orderNowVisibility(change:any){
    return !!this.payMode && (this.payMode === 'paylater' || (this.payMode === 'paynow' && !!this.paymentAmount.value && change >= 0));
  }

  currentOrderList: any;

   getRandomIntInclusive =(min:number, max:number)=> {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

  orderNow$:Observable<OrderList> = combineLatest([this.selectedCottages$, this.total$,this.cottageTotal$, this.grandTotal$, this.paymentAmount.valueChanges]).pipe(
    takeUntil(this.destroy$),
    map(([cottages,subtotal,cottageFee,grandTotal, paymentAmount])=>{
      console.log('cottages', cottages, this.dataSource.data)
      const _cottages = this.isCustomerOrder ? this.customerCottage : cottages;
      const _orderType = this.isCustomerOrder ? 'dinein' : this.orderType;
      const order:OrderList = {
        cottage: _cottages,
        subTotal: subtotal,
        cottageFee: cottageFee,
        grandTotal: grandTotal,
        paidAmount: paymentAmount || 0,
        status: 'Preparing',
        mode: _orderType as 'dinein' | 'takeout',
        area: _cottages.length > 0 ? _cottages[0].name : '',
        areaFee: cottageFee,
        discount: 0,
        payMode: this.payMode as 'paynow' | 'paylater',
        details: this.dataSource.data.map((orders)=> {
          return {...orders,status:''}
        })
      }

      console.log('ordernow', order)
      return order;
    
    }),
  )

  orderNow(){
    console.log('orderlist', this.currentOrderList)
    this.menuService.addOrderList(this.currentOrderList).subscribe();
    this.menuService.clearOrders();
    this.orderType = null;
    this.payMode = null;
    this.selectedCottage.setValue('');
    this.paymentAmount.setValue(0);
    
    this.snackbr.open('Order Complete','OK',{
      duration:3000,
      verticalPosition: 'top'
    });

    if(this.router.url==='/cashier/menu'){
      this.router.navigate(['/cashier/orders']);

    } else {
      this.router.navigate(['/customer/customer-home'],{queryParams: {id:this.customerCottage[0].id}});
    }
    

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
