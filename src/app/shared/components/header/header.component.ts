import { Component, OnInit, afterNextRender } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { UserService } from '../../../user/user.service';
import { checkIfMobile } from '../../util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
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

  currentUsr$ = this.userService.currentUser$;
  isMobile = checkIfMobile();
  
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
    private readonly router: Router,
    private readonly userService: UserService
  ){
    afterNextRender(()=>{
      this.userService.getCurrentUser();
    })
  }

  ngOnInit(): void {
  
  
  }
}