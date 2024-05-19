import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ModulesModule } from '../modules/modules.module';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    ModulesModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    CartComponent
  ]
})
export class ComponentsModule { }
