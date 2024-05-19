import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  noFooter$ = this.router.events.pipe(
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

  constructor(
    private readonly router: Router
  ){}

  gotoOrders(){
    this.router.navigate(['/cashier/orders'])
  }

  gotoHome(){
    this.router.navigate(['/cashier/menu'])
  }
  gotoKitchen(){
    this.router.navigate(['/cashier/kitchen'])
  }
  gotoSales(){
    this.router.navigate(['/cashier/sales'])
  }
}
