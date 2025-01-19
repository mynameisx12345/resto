import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrComponent } from './qr/qr.component';
import { RouterModule, Routes } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ItemsComponent } from './items/items.component';
import { CategoriesComponent } from './categories/categories.component';
import { ModulesModule } from '../shared/modules/modules.module';
import { ComponentsModule } from '../shared/components/components.module';
import { AddUserComponent } from './add-user/add-user.component';
const route: Routes = [
  {
    path: 'qr',
    component: QrComponent
  },
  {
    path: 'items',
    component: ItemsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  }
]

@NgModule({
  declarations: [
    QrComponent,
    AdminPanelComponent,
    ItemsComponent,
    CategoriesComponent,
    AddUserComponent
  ],
  imports: [
    QRCodeModule,
    CommonModule,
    ModulesModule,
    ComponentsModule,
    RouterModule.forChild(route),
  ]
})
export class AdminModule { }
