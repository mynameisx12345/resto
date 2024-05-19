import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  noHeaders$ = this.router.events.pipe(
    startWith(false),
    filter((event) => event instanceof NavigationEnd),
    map((event: any) => {
      const withoutHeaders = [
        '/user/login',
        '/',
        ''
      ];

      return withoutHeaders.includes(event.url);
    })
  );
  
  view$ = this.router.events.pipe(
    filter((event)=>event instanceof NavigationEnd),
    map((event:any)=>{
      let view='';
      switch(event.url){
        case '/cashier/menu':
          view = 'Cashier';
          break;
        case '/cashier/kitchen':
          view = 'Kitchen';
          break;
        case '/cashier/sales':
          view = 'Sales Report' ;
          break;
        case '/cashier/orders':
          view = 'Orders';
          break;
      }
      return view;
    })
  )

  constructor(
    private readonly router: Router
  ){}
}