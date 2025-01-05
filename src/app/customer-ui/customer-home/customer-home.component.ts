import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.scss'
})
export class CustomerHomeComponent implements OnInit, OnDestroy{
  constructor(
    private readonly router:Router,
    private readonly route:ActivatedRoute
  ){}

  cottageId = null; 
  onDestroy$ = new Subject;

  ngOnInit(): void {
    this.route.queryParams.pipe(
      takeUntil(this.onDestroy$),
      tap((param:any)=>{
        this.cottageId = param.id;
      })
    ).subscribe();
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
  orderNow(cottageId: any){
    this.router.navigate(['/customer/customer-menu'], { queryParams: { id: cottageId}})

  }

  myOrders(){
    this.router.navigate(['/customer/customer-order'],{queryParams: {id: this.cottageId}})
  }
}
