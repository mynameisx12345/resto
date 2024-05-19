import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ModulesModule } from '../shared/modules/modules.module';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuListComponent
  },
  {
    path: 'orders',
    component:OrdersComponent
  },
  {
    path: 'kitchen',
    component: KitchenComponent
  },
  {
    path: 'sales',
    component: SalesReportComponent
  }
]

@NgModule({
  declarations: [
    MenuListComponent,
    MenuComponent,
    OrdersComponent,
    KitchenComponent,
    SalesReportComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ModulesModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MenuComponent
  ]
})
export class CashierUiModule { }
