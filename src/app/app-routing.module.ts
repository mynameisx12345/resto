import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m=>m.UserModule)
  },
  {
    path: 'cashier',
    loadChildren: () => import('./cashier-ui/cashier-ui.module').then(m=>m.CashierUiModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer-ui/customer-ui.module').then(m=>m.CustomerUiModule)
  },
  {path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
  },
  //{ path: '', redirectTo: '/user/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
