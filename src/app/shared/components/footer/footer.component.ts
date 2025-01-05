import { Component } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { UserService } from '../../../user/user.service';
import { checkIfMobile } from '../../util';

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
        '/customer/customer-home',
        '/customer/customer-menu',
        '/customer/customer-order'

      ];

      

      const yesWithout = withoutHeaders.some((url)=>{
        console.log('events1', url, event.url.search(url))
        return event.url.search(url) >= 0
      })

      console.log('events', event.url, yesWithout)

      return yesWithout;
    })
  );

  

  currentUser$ = this.userService.currentUser$;

  isMobile = checkIfMobile();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute
  ){
    this.route.url.subscribe((url)=>{
      console.log('url', url)
    })
  }

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

  gotoQr(){
    this.router.navigate(['/admin/qr'])
  }

  logout(){
    this.router.navigate(['/user/login'])
    this.userService.setCurrentUser(null);
  }

  goToLink(link:string){
    this.router.navigate([link]);
  }
}
