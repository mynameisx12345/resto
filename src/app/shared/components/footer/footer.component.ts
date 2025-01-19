import { Component } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, take, tap } from 'rxjs';
import { UserService } from '../../../user/user.service';
import { DeviceDetectorService } from 'ngx-device-detector';

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
        return event.url.search(url) >= 0
      })


      return yesWithout;
    })
  );

  

  currentUser$ = this.userService.currentUser$;

  pages?:number[] = []

  isMobile = this.deviceService.isMobile();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly deviceService: DeviceDetectorService
  ){
    this.route.url.subscribe((url)=>{
      console.log('url', url)
    })

    this.currentUser$.pipe(
      tap((user)=>{
        console.log('curuser',user)
        this.pages = user?.pageAccess
      })
    ).subscribe()
  }

  pageExist(pageId:number){
    return this.pages?.find(page=>page === pageId)
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
