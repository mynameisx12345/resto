import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { ModulesModule } from '../shared/modules/modules.module';
import { ComponentsModule } from '../shared/components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { CashierUiModule } from '../cashier-ui/cashier-ui.module';

const routes: Routes = [
  {
    path: 'customer-menu',
    component: CustomerMenuComponent
  }
]

@NgModule({
  declarations: [
    CustomerMenuComponent
  ],
  imports: [
    CommonModule,
    ModulesModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    CashierUiModule
  ]
})
export class CustomerUiModule { }
