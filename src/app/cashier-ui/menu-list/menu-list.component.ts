import { Component } from '@angular/core';
import { MenuListService } from '../menu-list.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})
export class MenuListComponent {
  showCart=false;

  orders$ = this.menulistService.orders$.pipe(
    map((order)=>{
      return order.length;
    })
  )

  constructor(
    private readonly menulistService: MenuListService
  ){}


}
