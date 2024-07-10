import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrComponent } from './qr/qr.component';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  {
    path: 'qr',
    component: QrComponent
  }
]

@NgModule({
  declarations: [
    QrComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class AdminModule { }
