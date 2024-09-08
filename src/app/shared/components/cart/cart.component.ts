import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListService } from '../../../cashier-ui/menu-list.service';
import { Observable, Subject, combineLatest, filter, lastValueFrom, map, merge, startWith, take, takeUntil, tap, withLatestFrom, zip } from 'rxjs';
import { OrderList, Orders } from '../../../cashier-ui/menu-list.model';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  cottages = [
    { id: '1', name: 'Cottage 1', price: 150 },
    { id: '2', name: 'Cottage 2', price: 200 },
    { id: '3', name: 'Cottage 3', price: 100 },
    { id: '4', name: 'Table 1', price: 0 },
    { id: '5', name: 'Table 2', price: 0 },
    { id: '6', name: 'Table 3', price: 0 },
  ];

  orderType: 'takeout' | 'dinein' | null = null;
  selectedCottage = new FormControl('');
  paymentAmount = new FormControl(0);

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
    private readonly router: Router
  ) {}

  dataSource = new MatTableDataSource<Orders>();
  displayedColumns = ['name', 'quantity', 'price', 'action'];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.orders$.subscribe((orders: Orders[]) => {
        this.dataSource.data = orders;
      });
    }, 0);

    this.orderNow$.subscribe((orders)=>{
      this.currentOrderList = orders;
    });
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
    this.paymentAmount.setValue(0);
    this.payMode = type;
  }

  get paymentVisibility(){
    return this.orderType && (this.orderType === 'takeout' || (this.orderType ==='dinein' && !!this.selectedCottage.value))
  }

  orderNowVisibility(change:any){
    return !!this.payMode && (this.payMode === 'paylater' || (this.payMode === 'paynow' && !!this.paymentAmount.value && change >= 0));
  }

  currentOrderList: any;

  orderNow$:Observable<OrderList> = combineLatest([this.selectedCottages$, this.total$,this.cottageTotal$, this.grandTotal$, this.paymentAmount.valueChanges]).pipe(
    takeUntil(this.destroy$),
    map(([cottages,subtotal,cottageFee,grandTotal, paymentAmount])=>{
      const order:OrderList = {
        id: Math.random(),
        cottage: cottages,
        orderType: this.orderType || '',
        subtotal: subtotal,
        cottageFee: cottageFee,
        grandTotal: grandTotal,
        paidAmount: paymentAmount || 0,
        status: 'Preparing',
        details: this.dataSource.data.map((orders)=> {
          return {...orders,status:''}
        })
      }
      return order;
    
    }),
  )

  orderNow(){
    this.menuService.addOrderList(this.currentOrderList);
    this.menuService.clearOrders();
    this.orderType = null;
    this.payMode = null;
    this.selectedCottage.setValue('');
    this.paymentAmount.setValue(0);
    
    this.snackbr.open('Order Complete','OK',{
      duration:3000,
      verticalPosition: 'top'
    });
    
    this.router.navigate(['/cashier/orders']);

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
