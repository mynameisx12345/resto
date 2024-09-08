import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrComponent } from './qr/qr.component';
import { RouterModule, Routes } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
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
    QRCodeModule,
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class AdminModule { }
